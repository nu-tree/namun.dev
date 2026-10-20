import { createHonoApp } from '@/lib/hono/core';
import {
  getSiteSettingListHandler,
  getSiteSettingOneByKeyHandler,
  updateSiteSettingHandler,
} from '@/lib/hono/api/service/site-setting/service/site-setting.service';

export const siteSettingRouter = createHonoApp()
  .get('/', ...getSiteSettingListHandler)
  .get('/:key', ...getSiteSettingOneByKeyHandler)
  .put('/', ...updateSiteSettingHandler);
