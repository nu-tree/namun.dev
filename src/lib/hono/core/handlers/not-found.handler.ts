import { NotFoundHandler } from 'hono/types';

export const notFoundHandler: NotFoundHandler = (c) => {
  return c.json(
    {
      ok: false,
      error: {
        message: '요청한 API 엔드포인트를 찾을 수 없습니다.',
        status: 404,
        statusText: 'Not Found',
        timestamp: new Date().toISOString(),
      },
    },
    404,
  );
};
