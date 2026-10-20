import { rateLimiter } from 'hono-rate-limiter';
import { MiddlewareHandler } from 'hono/types';

export const rateLimiterMiddleware: MiddlewareHandler = rateLimiter({
  windowMs: 15 * 60 * 1000,
  standardHeaders: 'draft-6',
  skip(c) {
    return process.env.NODE_ENV === 'development';
  },
  keyGenerator: (c) => {
    // Hono context에서 직접 IP 추출
    const cfIp = c.req.header('cf-connecting-ip');
    if (cfIp) return cfIp;

    const xff = c.req.header('x-forwarded-for');
    const xffIp = xff?.split(',')[0].trim();
    if (xffIp) return xffIp;

    const remoteIp = c.req.header('x-real-ip');
    if (remoteIp) return remoteIp;

    return 'unknown';
  },
});
