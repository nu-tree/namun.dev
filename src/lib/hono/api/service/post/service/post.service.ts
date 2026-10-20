import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import { GetPostListRequestSchema } from '../schema/get-post.schema';
import { CreatePostSchema } from '../schema/create-post.schema';
import { UpdatePostSchema } from '../schema/update-post.schema';

/** 게시물 목록조회 핸들러 */
export const getPostList = createRouteHandler(zValidator('json', GetPostListRequestSchema), async (c) => {
  const { limit, offset, keyword, keywordName, boardSlug } = c.req.valid('json');

  const whereOption: Prisma.PostWhereInput = {
    ...(boardSlug ? { board: { slug: boardSlug } } : {}),
    ...(keywordName && keyword ? { [keywordName]: { contains: keyword, mode: 'insensitive' } } : {}),
  };

  const data = await prisma.post.findMany({
    take: limit ?? 10,
    skip: Math.max(0, (offset ?? 1) - 1),
    where: whereOption,
    orderBy: { createdAt: 'desc' },
  });

  const totalCounts = await prisma.post.count({ where: whereOption });

  return apiSuccess(c, { data, totalCounts });
});

/** ID로 단건 조회 */
export const getPostById = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return apiErrorHelpers.notFound(c, '게시물을 찾을 수 없습니다.');
  }

  return apiSuccess(c, post);
});

/** 생성 */
export const createPost = createRouteHandler(zValidator('json', CreatePostSchema), async (c) => {
  const postData = c.req.valid('json');

  const newPost = await prisma.post.create({
    data: {
      ...postData,
      attachments: postData.attachments || [],
    },
  });

  return apiSuccess(c, newPost);
});

/** 수정 */
export const updatePost = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', UpdatePostSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const postData = c.req.valid('json');

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return apiErrorHelpers.notFound(c, '게시물을 찾을 수 없습니다.');
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...postData,
        attachments: postData.attachments || [],
      },
    });

    return apiSuccess(c, updatedPost);
  },
);

/** 여러건 삭제 */
export const deletePost = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.post.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 게시물을 찾을 수 없습니다.');
  }

  return apiSuccess(c, deleteResult);
});
