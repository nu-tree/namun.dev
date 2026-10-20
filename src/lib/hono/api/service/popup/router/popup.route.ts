import { createHonoApp } from '@/lib/hono/core';
import {
  createPopupHandler,
  getPopupForPlatformHandler,
  getPopupListHandler,
  getPopupOneHandler,
  updatePopupHandler,
  deletePopupsHandler,
} from '../service/popup.service';

export const popupRouter = createHonoApp()
  .get('/admin', ...getPopupListHandler)
  .get('/admin/:id', ...getPopupOneHandler)
  .get('/platform', ...getPopupForPlatformHandler)
  .post('/create', ...createPopupHandler)
  .put('/update/:id', ...updatePopupHandler)
  .post('/delete', ...deletePopupsHandler);
