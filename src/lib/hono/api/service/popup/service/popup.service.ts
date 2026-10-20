import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { IdParamSchema, IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { zValidator } from '@hono/zod-validator';
import {
  GetPopupForPlatformRequest,
  GetPopupListRequestSchema,
} from '@/lib/hono/api/service/popup/schema/get-popup.schema';
import { CreatePopupSchema } from '../schema/create-popup.schema';
import { UpdatesPopupSchema } from '../schema/update-popup.schema';

/** 관리자페이지 팝업 목록 조회 */
export const getPopupListHandler = createRouteHandler(zValidator('query', GetPopupListRequestSchema), async (c) => {
  const { limit, offset, keyword, keywordName } = c.req.valid('query');

  const whereOption: Prisma.PopupWhereInput = {
    ...(keywordName && keyword ? { [keywordName]: { contains: keyword, mode: 'insensitive' } } : {}),
  };

  const data = await prisma.popup.findMany({
    take: limit ?? 10,
    skip: Math.max(0, (offset ?? 1) - 1),
    where: whereOption,
    orderBy: { createdAt: 'desc' },
  });

  const totalCounts = await prisma.popup.count({
    where: whereOption,
  });

  return apiSuccess(c, { data, totalCounts });
});

/** 팝업 단건 조회 */
export const getPopupOneHandler = createRouteHandler(zValidator('param', IdParamSchema), async (c) => {
  const id = c.req.valid('param').id;

  const popup = await prisma.popup.findUnique({
    where: { id },
  });

  if (!popup) {
    return apiErrorHelpers.notFound(c, '팝업을 찾을 수 없습니다.');
  }

  return apiSuccess(c, popup);
});

/** 사용자페이지용 팝업 조회 */
export const getPopupForPlatformHandler = createRouteHandler(
  zValidator('query', GetPopupForPlatformRequest),
  async (c) => {
    const currentDate = new Date();
    const { displayType, displayPages } = c.req.valid('query');

    const popups = await prisma.popup.findMany({
      where: {
        startDate: { lte: currentDate },
        endDate: { gte: currentDate },
        // displayType이 ALL인 값은 무조건 포함
        ...(displayType && {
          OR: [{ displayType }, { displayType: 'ALL' }],
        }),
        // memo: 페이지별로 팝업 노출시 조건 수정 필요
        ...(displayPages
          ? {
              OR: [
                { displayPages: null },
                { displayPages: '' },
                {
                  displayPages: {
                    contains: displayPages,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },
      omit: {
        createdAt: true,
        updatedAt: true,
        topPosition: true,
        leftPosition: true,
        width: true,
        height: true,
      },
      orderBy: { displayOrder: 'asc' },
    });

    return apiSuccess(c, popups);
  },
);

/** 팝업 생성 */
export const createPopupHandler = createRouteHandler(zValidator('json', CreatePopupSchema), async (c) => {
  const data = c.req.valid('json');

  const popup = await prisma.popup.create({
    data: {
      ...data,
      topPosition: data.topPosition ?? 0,
      leftPosition: data.leftPosition ?? 0,
      width: data.width ?? 0,
      height: data.height ?? 0,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  return apiSuccess(c, popup);
});

/** 팝업 수정 */
export const updatePopupHandler = createRouteHandler(
  zValidator('param', IdParamSchema),
  zValidator('json', UpdatesPopupSchema),
  async (c) => {
    const id = c.req.valid('param').id;
    const data = c.req.valid('json');

    const existingPopup = await prisma.popup.findUnique({
      where: { id },
    });

    if (!existingPopup) {
      return apiErrorHelpers.notFound(c, '팝업을 찾을 수 없습니다.');
    }

    const updatedPopup = await prisma.popup.update({
      where: { id },
      data: {
        ...data,
        topPosition: data.topPosition ?? 0,
        leftPosition: data.leftPosition ?? 0,
        width: data.width ?? 0,
        height: data.height ?? 0,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return apiSuccess(c, updatedPopup);
  },
);

/** 팝업 여러건 삭제 */
export const deletePopupsHandler = createRouteHandler(zValidator('json', IdsQuerySchema), async (c) => {
  const { ids } = c.req.valid('json');

  const res = await prisma.popup.deleteMany({
    where: {
      id: { in: ids },
    },
  });

  if (res.count === 0) {
    return apiErrorHelpers.notFound(c, '삭제할 팝업을 찾을 수 없습니다.');
  }

  return apiSuccess(c, null);
});
