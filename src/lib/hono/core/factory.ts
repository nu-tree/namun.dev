import { auth, AuthType } from '@/lib/auth';
import { createFactory } from 'hono/factory';
import { logger } from './handlers/logger.middleware';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { session } from './handlers/session.middleware';
import { authCors } from './handlers/auth-cors.middleware';
import { rateLimiterMiddleware } from './handlers/rate-limiter.middleware';
import { globalErrorHandler } from './handlers/global-error.handler';
import { notFoundHandler } from './handlers/not-found.handler';

export const factory = createFactory<{ Variables: AuthType }>({
  initApp(app) {
    // logger 등록
    app
      .use('*', logger)
      // session 등록
      .use('*', session)
      // auth cors 등록
      .use('/auth/*', authCors)
      // rate limiter 등록
      // NOTE API 에러 처리 미들웨어
      // [ ] 에러로그 관련 기능 추가 (에러 로그 저장)
      // [ ] 에러로그 관련 관리자 기능 추가 (에러 로그 관리)
      .onError(globalErrorHandler)
      // not found 핸들러
      .notFound(notFoundHandler);
  },
});

export const createHonoApp = () => factory.createApp();

export const createRouteHandler = factory.createHandlers;

export const createMiddleware = factory.createMiddleware;
