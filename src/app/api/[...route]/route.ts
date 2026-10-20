import { handle } from 'hono/vercel';
import { auth } from '@/lib/auth';
import { createHonoApp } from '@/lib/hono/core';
import { bannerRouter } from '@/lib/hono/api/service/banner/router/banner.route';
import { boardRouter } from '@/lib/hono/api/service/board/router/board.route';
import { postRouter } from '@/lib/hono/api/service/post/router/post.route';
import { popupRouter } from '@/lib/hono/api/service/popup/router/popup.route';
import { userRouter } from '@/lib/hono/api/service/user/router/user.route';
import { siteSettingRouter } from '@/lib/hono/api/service/site-setting/router/site-setting.route';
import { organizationRouter } from '@/lib/hono/api/service/organization/router/organization.route';
import { metricsRouter } from '@/lib/hono/api/service/metrics/router/metrics.route';
import { inquiryMetaRouter } from '@/lib/hono/api/service/inquiry-meta/router/inquiry-meta.route';
import { inquiryRouter } from '@/lib/hono/api/service/inquiry/router/inquiry.route';
import { replyRouter } from '@/lib/hono/api/service/reply/router/reply.route';
import { commentRouter } from '@/lib/hono/api/service/comment/router/comment.route';

const app = createHonoApp()
  .basePath('/api')
  .on(['POST', 'GET'], '/auth/*', (c) => auth.handler(c.req.raw))
  .route('/banner', bannerRouter)
  .route('/board', boardRouter)
  .route('/post', postRouter)
  .route('/popup', popupRouter)
  .route('/user', userRouter)
  .route('/site-setting', siteSettingRouter)
  .route('/organization', organizationRouter)
  .route('/metrics', metricsRouter)
  .route('/inquiry-meta', inquiryMetaRouter)
  .route('/inquiry', inquiryRouter)
  .route('/reply', replyRouter)
  .route('/comment', commentRouter);

const handler = handle(app);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
