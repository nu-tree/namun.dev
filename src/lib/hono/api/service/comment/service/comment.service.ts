import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import { GetCommentsRequestSchema } from '../schema/get-comment.schema';
import { CreateCommentSchema, UpdateCommentSchema } from '../schema/create-comment.schema';

/** 댓글 목록 조회 */
export const getComments = createRouteHandler(zValidator('query', GetCommentsRequestSchema), async (c) => {
  const { limit, offset, postId, userId } = c.req.valid('query');

  const whereOption: Prisma.CommentWhereInput = {
    ...(postId ? { postId } : {}),
    ...(userId ? { userId } : {}),
  };

  const data = await prisma.comment.findMany({
    take: limit ?? 10,
    skip: Math.max(0, (offset ?? 1) - 1),
    where: whereOption,
    orderBy: { createdAt: 'desc' },
  });

  const totalCounts = await prisma.comment.count({ where: whereOption });

  return apiSuccess(c, { data, totalCounts });
});

/** 댓글 생성 */
export const createComment = createRouteHandler(zValidator('json', CreateCommentSchema), async (c) => {
  const data = c.req.valid('json');

  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      postId: data.postId,
      username: data.username || null,
      userId: data.userId || null,
      parentId: data.parentId || null,
    },
  });

  return apiSuccess(c, comment);
});

/** 댓글 수정 */
export const updateComment = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', UpdateCommentSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');

    const comment = await prisma.comment.update({
      where: { id },
      data: {
        ...(data.content !== undefined && { content: data.content }),
        ...(data.postId !== undefined && { postId: data.postId }),
        ...(data.username !== undefined && { username: data.username }),
        ...(data.userId !== undefined && { userId: data.userId }),
        ...(data.parentId !== undefined && { parentId: data.parentId }),
      },
    });

    return apiSuccess(c, comment);
  },
);

/** 댓글 여러건 삭제 */
export const deleteComments = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.comment.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 댓글을 찾을 수 없습니다.');
  }

  return apiSuccess(c, { deletedCount: deleteResult.count });
});
