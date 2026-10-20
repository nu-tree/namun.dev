import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import { GetBoardListRequestSchema } from '@/lib/hono/api/service/board/schema/get-board.schema';
import { CreateBoardSchema } from '@/lib/hono/api/service/board/schema/create-board.schema';

/** 게시판 목록 조회 핸들러 */
export const getBoardList = createRouteHandler(zValidator('json', GetBoardListRequestSchema), async (c) => {
  const { limit, offset, keyword, keywordName } = c.req.valid('json');

  const whereOption: Prisma.BoardWhereInput = {
    ...(keywordName && keyword ? { [keywordName]: { contains: keyword, mode: 'insensitive' } } : {}),
  };

  const data = await prisma.board.findMany({
    take: limit ?? 10,
    skip: Math.max(0, (offset ?? 1) - 1),
    where: whereOption,
    orderBy: { createdAt: 'desc' },
  });

  const totalCounts = await prisma.board.count({ where: whereOption });

  return apiSuccess(c, { data, totalCounts });
});

/** SLUG 전체 조회 */
export const getAllBoardSlugs = createRouteHandler(async (c) => {
  const data = await prisma.board.findMany({
    select: { id: true, slug: true, title: true, feature: true },
    orderBy: { createdAt: 'desc' },
  });

  return apiSuccess(c, { data });
});

/** ID로 단건 조회 */
export const getBoardById = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const board = await prisma.board.findUnique({
    where: { id },
  });

  if (!board) {
    return apiErrorHelpers.notFound(c, '게시판을 찾을 수 없습니다.');
  }

  return apiSuccess(c, board);
});

/** SLUG로 단건 조회  */
export const getBoardBySlug = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const board = await prisma.board.findUnique({
    where: { slug: id },
  });

  if (!board) {
    return apiErrorHelpers.notFound(c, '게시판을 찾을 수 없습니다.');
  }

  return apiSuccess(c, board);
});

/** 생성 */
export const createBoard = createRouteHandler(zValidator('json', CreateBoardSchema), async (c) => {
  const data = c.req.valid('json');

  const board = await prisma.board.create({
    data: {
      slug: data.slug,
      title: data.title,
      feature: { ...data.feature },
    },
  });

  return apiSuccess(c, board);
});

/** 수정 */
export const updateBoard = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', CreateBoardSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');

    const board = await prisma.board.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        feature: { ...data.feature },
      },
    });

    return apiSuccess(c, board);
  },
);

/** 여러건 삭제 */
export const deleteBoard = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.board.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 게시판을 찾을 수 없습니다.');
  }

  return apiSuccess(c, { deletedCount: deleteResult.count });
});
