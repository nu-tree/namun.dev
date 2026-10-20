import { GetBannerListRequestSchema } from '@/lib/hono/api/service/banner/schema/get-banner.schema';
import { CreateBannerSchema } from '@/lib/hono/api/service/banner/schema/create-banner.schema';
import { UpdateBannerSchema } from '@/lib/hono/api/service/banner/schema/update-banner.schema';
import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';

/** 관리자페이지 목록조회 */
export const getBannerList = createRouteHandler(zValidator('json', GetBannerListRequestSchema), async (c) => {
  const { limit, offset, keyword, keywordName, isView } = c.req.valid('json');

  const whereOption: Prisma.BannerWhereInput = {
    ...(keywordName && keyword ? { [keywordName]: { contains: keyword, mode: 'insensitive' } } : {}),
    ...(isView !== undefined ? { isView } : {}),
  };

  const data = await prisma.banner.findMany({
    take: limit ?? 10,
    skip: Math.max(0, (offset ?? 1) - 1),
    where: whereOption,
    orderBy: { createdAt: 'desc' },
  });

  const totalCounts = await prisma.banner.count({ where: whereOption });

  return apiSuccess(c, { data, totalCounts });
});

/** ID로 단건 조회 */
export const getBannerById = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const banner = await prisma.banner.findUnique({
    where: { id },
    include: { bannerItems: true },
  });

  if (!banner) {
    return apiErrorHelpers.notFound(c, '배너를 찾을 수 없습니다.');
  }

  return apiSuccess(c, banner);
});

/** SLUG로 단건 조회 */
export const getBannerBySlug = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const { id } = c.req.valid('param');

  const banner = await prisma.banner.findUnique({
    where: { slug: id },
    include: { bannerItems: true },
  });

  if (!banner) {
    return apiErrorHelpers.notFound(c, '배너를 찾을 수 없습니다.');
  }

  return apiSuccess(c, banner);
});

/** 생성 */
export const createBanner = createRouteHandler(zValidator('json', CreateBannerSchema), async (c) => {
  const data = c.req.valid('json');
  // 배너 생성
  const banner = await prisma.banner.create({
    data: {
      slug: data.slug,
      isView: data.isView,
      bannerHeight: data.bannerHeight,
      bannerWidth: data.bannerWidth,
    },
  });

  if (!banner) {
    return apiErrorHelpers.serverError(c, '배너 생성에 실패했습니다.');
  }

  // 배너 아이템들 생성
  if (data.bannerItems && data.bannerItems.length > 0) {
    try {
      await prisma.$transaction(async (tx) => {
        for (const item of data.bannerItems) {
          await tx.bannerItem.create({
            data: {
              bannerId: banner.id,
              displayOrder: item.displayOrder,
              displayType: item.displayType,
              startDate: item.startDate ? new Date(item.startDate) : new Date(),
              endDate: item.endDate ? new Date(item.endDate) : null,
              imageUrl: item.imageUrl,
              linkUrl: item.linkUrl,
            },
          });
        }
      });
    } catch (error) {
      // 트랜잭션 실패 시 이미 생성된 배너도 삭제
      await prisma.banner.delete({ where: { id: banner.id } });

      return apiErrorHelpers.serverError(
        c,
        error instanceof Error ? error.message : '배너 아이템 생성에 실패했습니다.',
      );
    }
  }

  return apiSuccess(c, banner);
});

/** 수정 */
export const updateBanner = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', UpdateBannerSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        slug: data.slug,
        isView: data.isView,
        bannerHeight: data.bannerHeight,
        bannerWidth: data.bannerWidth,
      },
    });

    if (!banner) {
      return apiErrorHelpers.serverError(c, '배너 수정에 실패했습니다.');
    }

    // 배너 아이템들 수정 트랜잭션(기존 아이템 삭제 후 재생성)
    try {
      await prisma.$transaction(async (tx) => {
        await tx.bannerItem.deleteMany({
          where: { bannerId: banner.id },
        });

        if (data.bannerItems && data.bannerItems.length > 0) {
          for (const item of data.bannerItems) {
            await tx.bannerItem.create({
              data: {
                bannerId: banner.id,
                displayOrder: item.displayOrder,
                displayType: item.displayType,
                startDate: item.startDate ? new Date(item.startDate) : new Date(),
                endDate: item.endDate ? new Date(item.endDate) : null,
                imageUrl: item.imageUrl,
                linkUrl: item.linkUrl,
              },
            });
          }
        }
      });
    } catch (error) {
      return apiErrorHelpers.serverError(
        c,
        error instanceof Error ? error.message : '배너 아이템 수정에 실패했습니다.',
      );
    }

    return apiSuccess(c, banner);
  },
);

/** 여러건 삭제 */
export const deleteBanner = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const deleteResult = await prisma.banner.deleteMany({
    where: { id: { in: ids } },
  });

  if (deleteResult.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 배너를 찾을 수 없습니다.');
  }

  return apiSuccess(c, { deletedCount: deleteResult.count });
});
