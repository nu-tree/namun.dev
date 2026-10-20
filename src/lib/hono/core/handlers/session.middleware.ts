import { auth } from '@/lib/auth';
import { MiddlewareHandler } from 'hono/types';

export const session: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  c.set('user', session ? session.user : null);
  c.set('session', session ? session.session : null);
  return next();
};
