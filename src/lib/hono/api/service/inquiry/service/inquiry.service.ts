import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import { GetInquiriesRequestSchema } from '../schema/get-inquiry.schema';
import { CreateInquirySchema, UpdateInquirySchema } from '../schema/create-inquiry.schema';

/** 문의 목록 조회 */
export const getInquiryList = createRouteHandler(zValidator('query', GetInquiriesRequestSchema), async (c) => {
  const { limit, offset, inquiryMetaId, keyword, keywordName, isAnswered } = c.req.valid('query');

  const whereOption: Prisma.InquiryWhereInput = {
    ...(inquiryMetaId ? { inquiryMetaId } : {}),
    ...(isAnswered !== undefined && isAnswered !== null ? { isAnswered } : {}),
    ...(keyword && keywordName
      ? {
          [keywordName]: {
            contains: keyword,
            mode: 'insensitive',
          },
        }
      : {}),
  };

  const data = await prisma.inquiry.findMany({
    take: limit ?? 10,
    skip: Math.max(0, (offset ?? 1) - 1),
    where: whereOption,
    orderBy: { createdAt: 'desc' },
    include: {
      inquiryMeta: {
        select: { title: true },
      },
    },
  });

  const totalCounts = await prisma.inquiry.count({ where: whereOption });

  return apiSuccess(c, { data, totalCounts });
});

/** ID로 문의 단건 조회 */
export const getInquiryOne = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: {
      inquiryMeta: {
        select: { title: true },
      },
      reply: true,
    },
  });

  if (!inquiry) {
    return apiErrorHelpers.notFound(c, '문의를 찾을 수 없습니다.');
  }

  return apiSuccess(c, inquiry);
});

/** 문의 생성 */
export const createInquiry = createRouteHandler(zValidator('json', CreateInquirySchema), async (c) => {
  const data = c.req.valid('json');

  const inquiry = await prisma.inquiry.create({
    data: {
      title: data.title,
      content: data.content,
      isAnswered: data.isAnswered ?? false,
      inquiryMetaId: data.inquiryMetaId,
      userId: data.userId || null,
      contact: data.contact || null,
      isSecret: data.isSecret ?? false,
      replyId: data.replyId || null,
    },
  });

  return apiSuccess(c, inquiry);
});

/** 문의 수정 */
export const updateInquiry = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', UpdateInquirySchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.isAnswered !== undefined && { isAnswered: data.isAnswered }),
        ...(data.inquiryMetaId !== undefined && { inquiryMetaId: data.inquiryMetaId }),
        ...(data.userId !== undefined && { userId: data.userId }),
        ...(data.contact !== undefined && { contact: data.contact }),
        ...(data.isSecret !== undefined && { isSecret: data.isSecret }),
        ...(data.replyId !== undefined && { replyId: data.replyId }),
      },
    });

    return apiSuccess(c, inquiry);
  },
);

/** 문의 여러건 삭제 */
export const deleteInquiryMany = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.inquiry.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 문의를 찾을 수 없습니다.');
  }

  return apiSuccess(c, { deletedCount: deleteResult.count });
});
