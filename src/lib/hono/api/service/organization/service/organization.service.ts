import { prisma } from '@/lib/setting/prisma/prisma.server';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import { Prisma } from '@prisma-client/client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { generateRandomPassword } from '@/lib/utils/generate-random-password';
import { OWNER_ORG_SLUG } from '@/lib/constants/site-setting-constants';
import { GetOrganizationMembersRequestSchema, GetOrganizationsRequestSchema } from '../schema/get-organization.schema';
import {
  AddOrganizationMemberSchema,
  CreateOrganizationSchema,
  UpdateOrganizationSchema,
} from '../schema/create-organization.schema';
import { decrypt, encrypt } from '@/lib/auth/crypto-utils.server';

/** 사용자의 활성 조직 조회 */
export const getActiveOrganization = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id: userId } = c.req.valid('param');

  const organization = await prisma.member.findFirst({
    select: { organizationId: true },
    where: { userId },
  });

  return apiSuccess(c, organization ? organization.organizationId : null);
});

/** 조직 목록 조회 */
export const getOrganizations = createRouteHandler(zValidator('query', GetOrganizationsRequestSchema), async (c) => {
  const { limit, offset, keyword, keywordName } = c.req.valid('query');

  const whereOption: Prisma.OrganizationWhereInput = {
    ...(keyword && keywordName
      ? {
          [keywordName]: {
            contains: keyword,
            mode: 'insensitive',
          },
        }
      : {}),
    slug: { not: OWNER_ORG_SLUG }, // site-owner 조직 제외
  };

  const data = await prisma.organization.findMany({
    take: limit ?? 10,
    skip: Math.max(0, (offset ?? 1) - 1),
    where: whereOption,
    orderBy: { createdAt: 'desc' },
  });

  const totalCounts = await prisma.organization.count({ where: whereOption });

  // metadata JSON 파싱
  const parsedData = data.map((item) => ({
    ...item,
    metadata: item.metadata ? JSON.parse(item.metadata) : null,
  }));

  return apiSuccess(c, { data: parsedData, totalCounts });
});

/** 조직 멤버 목록 조회 */
export const getOrganizationMembers = createRouteHandler(
  zValidator('query', GetOrganizationMembersRequestSchema),
  async (c) => {
    const { limit, offset, organizationId } = c.req.valid('query');

    const data = await prisma.member.findMany({
      take: limit ?? 10,
      skip: Math.max(0, (offset ?? 1) - 1),
      where: { organizationId },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 목록에서 핸드폰 번호 복호화
    const decryptedData = await Promise.all(
      data.map(async (member) => {
        const decryptedPhone = member.user.phoneNumber ? await decrypt(member.user.phoneNumber) : '';
        return {
          ...member,
          user: {
            ...member.user,
            phoneNumber: decryptedPhone,
          },
        };
      }),
    );

    const totalCounts = await prisma.member.count({ where: { organizationId } });

    return apiSuccess(c, { data: decryptedData, totalCounts });
  },
);

/** ID로 조직 단건 조회 */
export const getOrganizationById = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const organization = await prisma.organization.findUnique({
    where: { id },
  });

  if (!organization) {
    return apiErrorHelpers.notFound(c, '조직을 찾을 수 없습니다.');
  }

  // metadata JSON 파싱
  const parsedOrganization = {
    ...organization,
    metadata: organization.metadata ? JSON.parse(organization.metadata) : null,
  };

  return apiSuccess(c, parsedOrganization);
});

/** 조직 생성 */
export const createOrganization = createRouteHandler(zValidator('json', CreateOrganizationSchema), async (c) => {
  const data = c.req.valid('json');

  const organization = await prisma.organization.create({
    data: {
      name: data.name,
      slug: data.slug,
      logo: data.logo || '',
      metadata: data.metadata ? JSON.stringify(data.metadata) : null,
    },
  });

  return apiSuccess(c, organization);
});

/** 조직에 멤버 추가 */
export const addOrganizationMember = createRouteHandler(zValidator('json', AddOrganizationMemberSchema), async (c) => {
  const body = c.req.valid('json');
  const randomPassword = generateRandomPassword();

  try {
    // 1. 유저 생성
    // 1-1. 이미 존재하는 이메일인지 확인
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      return apiErrorHelpers.conflict(c, '이미 존재하는 이메일입니다.');
    }

    // 1-2. 핸드폰 번호 암호화
    const encryptedPhoneNumber = await encrypt(body.phoneNumber);
    // 1-3. 유저 생성 API 호출
    const userData = await auth.api.createUser({
      headers: await headers(),
      body: {
        email: body.email,
        name: body.name,
        password: randomPassword,
        role: 'user',
        data: {
          phoneNumber: encryptedPhoneNumber,
        },
      },
    });

    // 2. 조직에 멤버 추가
    const member = await auth.api.addMember({
      headers: await headers(),
      body: {
        userId: userData.user.id,
        role: 'admin',
        organizationId: body.organizationId,
      },
    });

    return apiSuccess(c, member);
  } catch (error) {
    console.error('Add Organization Member Error:', error);
    return apiErrorHelpers.serverError(c, '조직 멤버 추가 중 오류가 발생했습니다.');
  }
});

/** 조직 수정 */
export const updateOrganization = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', UpdateOrganizationSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');

    const organization = await prisma.organization.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.slug && { slug: data.slug }),
        ...(data.logo !== undefined && { logo: data.logo }),
        ...(data.metadata !== undefined && { metadata: data.metadata ? JSON.stringify(data.metadata) : null }),
      },
    });

    return apiSuccess(c, organization);
  },
);

/** 조직 단건 삭제 */
export const deleteOrganization = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const organization = await prisma.organization.delete({
    where: { id },
  });

  return apiSuccess(c, organization);
});

/** 조직 여러건 삭제 */
export const deleteOrganizations = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.organization.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 조직을 찾을 수 없습니다.');
  }

  return apiSuccess(c, { deletedCount: deleteResult.count });
});

/** 조직 멤버 단건 제거 */
export const removeOrganizationMember = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const member = await prisma.member.delete({
    where: { id },
  });

  return apiSuccess(c, member);
});

/** 조직 멤버 여러건 제거 */
export const removeOrganizationMembers = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.member.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 멤버를 찾을 수 없습니다.');
  }

  return apiSuccess(c, { deletedCount: deleteResult.count });
});
