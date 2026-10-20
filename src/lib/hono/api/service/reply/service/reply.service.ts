import { prisma } from '@/lib/setting/prisma/prisma.server';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import { CreateReplySchema, UpdateReplySchema } from '../schema/create-reply.schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

/** inquiryId로 답변 단건 조회 */
export const getReplyByInquiryId = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id: inquiryId } = c.req.valid('param');

  const reply = await prisma.reply.findUnique({
    where: { inquiryId },
    include: {
      user: { select: { name: true } },
    },
  });

  return apiSuccess(c, reply);
});

/** 답변 생성 */
export const createReply = createRouteHandler(zValidator('json', CreateReplySchema), async (c) => {
  const data = c.req.valid('json');

  // 세션에서 사용자 정보 가져오기
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return apiErrorHelpers.unauthorized(c, '로그인이 필요합니다.');
  }

  // 트랜잭션
  const res = await prisma.$transaction(async (tx) => {
    const reply = await tx.reply.create({
      data: {
        content: data.content,
        inquiryId: data.inquiryId,
        userId: session.user.id,
      },
    });

    await tx.inquiry.update({
      where: { id: data.inquiryId },
      data: { isAnswered: true, replyId: reply.id },
    });

    return reply;
  });

  return apiSuccess(c, res);
});

/** 답변 수정 */
export const updateReply = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', UpdateReplySchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');

    const reply = await prisma.reply.update({
      where: { id },
      data: {
        content: data.content,
      },
    });

    return apiSuccess(c, reply);
  },
);

/** 답변 단건 삭제 */
export const deleteReply = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const reply = await prisma.reply.delete({
    where: { id },
  });

  await prisma.inquiry.update({
    where: { id: reply.inquiryId },
    data: { isAnswered: false, replyId: null },
  });

  return apiSuccess(c, reply);
});
