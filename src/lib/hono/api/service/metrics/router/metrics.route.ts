import { createHonoApp } from '@/lib/hono/core';
import {
  getDailyVisitor,
  getDailyNewUser,
  getTopUserDevice,
  getNewestUsers,
} from '@/lib/hono/api/service/metrics/service/metrics.service';

export const metricsRouter = createHonoApp()
  .get('/daily-visitor', ...getDailyVisitor)
  .get('/daily-new-user', ...getDailyNewUser)
  .get('/top-user-device', ...getTopUserDevice)
  .get('/newest-users', ...getNewestUsers);
