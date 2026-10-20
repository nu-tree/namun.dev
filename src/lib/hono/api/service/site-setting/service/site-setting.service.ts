import { prisma } from '@/lib/setting/prisma/prisma.server';
import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { zValidator } from '@hono/zod-validator';
import { GetSiteSettingSchema } from '../schema/get-site-setting.schema';
import { UpdateSiteSettingSchema } from '../schema/update-site-setting.schema';

/** 모든 사이트 설정 조회 */
export const getSiteSettingListHandler = createRouteHandler(async (c) => {
  const data = await prisma.siteSetting.findMany();

  return apiSuccess(c, { data });
});

/** 사이트 설정 key로 단건 조회 */
export const getSiteSettingOneByKeyHandler = createRouteHandler(
  zValidator('param', GetSiteSettingSchema),
  async (c) => {
    const { key } = c.req.valid('param');

    const siteSetting = await prisma.siteSetting.findUnique({
      where: { key },
    });

    return apiSuccess(c, siteSetting);
  },
);

/** 사이트 설정 수정 */
export const updateSiteSettingHandler = createRouteHandler(zValidator('json', UpdateSiteSettingSchema), async (c) => {
  const { key, value } = c.req.valid('json');

  const siteSetting = await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  return apiSuccess(c, siteSetting);
});
