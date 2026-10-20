import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import { GetInquiryMetaListRequestSchema } from '../schema/get-inquiry-meta.schema';
import { CreateInquiryMetaSchema, UpdateInquiryMetaSchema } from '../schema/create-inquiry-meta.schema';

/** 문의 메타 목록 조회 */
export const getInquiryMetaList = createRouteHandler(
  zValidator('query', GetInquiryMetaListRequestSchema),
  async (c) => {
    const { limit, offset, keyword, keywordName } = c.req.valid('query');

    const whereOption: Prisma.InquiryMetaWhereInput = {
      ...(keywordName && keyword ? { [keywordName]: { contains: keyword, mode: 'insensitive' } } : {}),
    };

    const data = await prisma.inquiryMeta.findMany({
      take: limit ?? 10,
      skip: Math.max(0, (offset ?? 1) - 1),
      where: whereOption,
      orderBy: { createdAt: 'desc' },
    });

    const totalCounts = await prisma.inquiryMeta.count({ where: whereOption });

    return apiSuccess(c, { data, totalCounts });
  },
);

/** ID로 문의 메타 단건 조회 */
export const getInquiryMetaOne = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const inquiryMeta = await prisma.inquiryMeta.findUnique({
    where: { id },
  });

  if (!inquiryMeta) {
    return apiErrorHelpers.notFound(c, '문의 메타를 찾을 수 없습니다.');
  }

  return apiSuccess(c, inquiryMeta);
});

/** SLUG로 문의 메타 단건 조회 */
export const getInquiryMetaOneBySlug = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const inquiryMeta = await prisma.inquiryMeta.findUnique({
    where: { slug: id },
  });

  if (!inquiryMeta) {
    return apiErrorHelpers.notFound(c, '문의 메타를 찾을 수 없습니다.');
  }

  return apiSuccess(c, inquiryMeta);
});

/** 문의 메타 생성 */
export const createInquiryMeta = createRouteHandler(zValidator('json', CreateInquiryMetaSchema), async (c) => {
  const data = c.req.valid('json');

  // slug 중복 체크
  const existingMeta = await prisma.inquiryMeta.findUnique({
    where: { slug: data.slug },
  });

  if (existingMeta) {
    return apiErrorHelpers.badRequest(c, '이미 존재하는 slug입니다.');
  }

  const inquiryMeta = await prisma.inquiryMeta.create({
    data: {
      title: data.title,
      slug: data.slug,
      managerName: data.managerName || null,
      managerMail: data.managerMail || null,
    },
  });

  return apiSuccess(c, inquiryMeta);
});

/** 문의 메타 수정 */
export const updateInquiryMeta = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', UpdateInquiryMetaSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');

    const inquiryMeta = await prisma.inquiryMeta.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.slug && { slug: data.slug }),
        ...(data.managerName !== undefined && { managerName: data.managerName }),
        ...(data.managerMail !== undefined && { managerMail: data.managerMail }),
      },
    });

    return apiSuccess(c, inquiryMeta);
  },
);

/** 문의 메타 단건 삭제 */
export const deleteInquiryMeta = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const inquiryMeta = await prisma.inquiryMeta.delete({
    where: { id },
  });

  return apiSuccess(c, inquiryMeta);
});

/** 문의 메타 여러건 삭제 */
export const deleteManyInquiryMeta = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.inquiryMeta.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 문의 메타를 찾을 수 없습니다.');
  }

  return apiSuccess(c, { deletedCount: deleteResult.count });
});
