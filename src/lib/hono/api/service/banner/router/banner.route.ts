import { createHonoApp } from '@/lib/hono/core';
import {
  getBannerList,
  getBannerById,
  getBannerBySlug,
  createBanner,
  updateBanner,
  deleteBanner,
} from '@/lib/hono/api/service/banner/service/banner.service';

export const bannerRouter = createHonoApp()
  .get('/', ...getBannerList)
  .get('/id/:id', ...getBannerById)
  .get('/slug/:id', ...getBannerBySlug)
  .post('/create', ...createBanner)
  .put('/update/:id', ...updateBanner)
  .post('/delete', ...deleteBanner);
