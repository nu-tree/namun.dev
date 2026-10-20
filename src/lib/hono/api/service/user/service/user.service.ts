import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import { GetUserListRequestSchema } from '@/lib/hono/api/service/user/schema/get-user.schema';
import { decrypt, encrypt } from '@/lib/auth/crypto-utils.server';
import { UpdateUsersSchema } from '../schema/update-user.schema';

/** 관리자페이지 사용자 목록 조회 */
export const getUserListHandler = createRouteHandler(zValidator('query', GetUserListRequestSchema), async (c) => {
  const { limit, offset, keyword, keywordName, userRole } = c.req.valid('query');

  const whereOption: Prisma.UserWhereInput = {
    ...(keywordName && keyword ? { [keywordName]: { contains: keyword, mode: 'insensitive' } } : {}),
    ...(userRole ? { role: userRole } : {}),
  };

  const data = await prisma.user.findMany({
    take: limit ?? 10,
    skip: Math.max(0, (offset ?? 1) - 1),
    where: whereOption,
    orderBy: { createdAt: 'desc' },
  });

  const decryptedData = (await Promise.all(
    data.map(async (user) => {
      const decryptedPhone = user.phoneNumber ? await decrypt(user.phoneNumber) : '';
      return { ...user, phoneNumber: decryptedPhone };
    }),
  )) as typeof data;

  const totalCounts = await prisma.user.count({
    where: whereOption,
  });

  return apiSuccess(c, { data: decryptedData, totalCounts });
});

/** 사용자 단건 조회 */
export const getUserOneHandler = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const id = c.req.valid('param').id;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return apiErrorHelpers.notFound(c, '사용자를 찾을 수 없습니다.');
  }

  const decryptedPhone = user.phoneNumber ? await decrypt(user.phoneNumber) : '';
  Object.assign(user, { phoneNumber: decryptedPhone });

  return apiSuccess(c, user);
});

/** 사용자 수정 */
export const updateUserHandler = createRouteHandler(zValidator('json', UpdateUsersSchema), async (c) => {
  const id = c.req.param('id');
  const updateData = c.req.valid('json');

  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    return apiErrorHelpers.notFound(c, '수정할 사용자를 찾을 수 없습니다.');
  }

  // 암호화 처리할 데이터 준비
  const dataToUpdate = { ...updateData };

  // phoneNumber 필드 처리
  if (updateData.phoneNumber) {
    if (existingUser.phoneNumber) {
      const decryptedPhone = await decrypt(existingUser.phoneNumber);
      // 기존 값과 같으면 암호화된 값 유지
      if (updateData.phoneNumber === decryptedPhone) {
        dataToUpdate.phoneNumber = existingUser.phoneNumber;
      } else {
        // 새로운 값이면 암호화
        dataToUpdate.phoneNumber = await encrypt(updateData.phoneNumber);
      }
    } else {
      // 기존에 값이 없었으면 새로 암호화
      dataToUpdate.phoneNumber = await encrypt(updateData.phoneNumber);
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: dataToUpdate,
  });

  return apiSuccess(c, updatedUser);
});

/** 여러건 삭제 */
export const deleteUser = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.user.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 게시물을 찾을 수 없습니다.');
  }

  return apiSuccess(c, deleteResult);
});
