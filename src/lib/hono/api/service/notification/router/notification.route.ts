import { createHonoApp } from '@/lib/hono/core';
import { sendEmail, sendSMS, sendAlimtalk } from '../service/notification.service';

export const notificationRouter = createHonoApp()
  .post('/email', ...sendEmail)
  .post('/sms', ...sendSMS)
  .post('/alimtalk', ...sendAlimtalk);
