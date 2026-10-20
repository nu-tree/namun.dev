import { HTTPException } from 'hono/http-exception';
import { ErrorHandler } from 'hono/types';

// NOTE API 에러 처리 미들웨어
// [ ] 에러로그 관련 기능 추가 (에러 로그 저장)
// [ ] 에러로그 관련 관리자 기능 추가 (에러 로그 관리)
export const globalErrorHandler: ErrorHandler = (err, c) => {
  console.error('API Error:', err);

  if (err instanceof HTTPException) {
    return c.json(
      {
        ok: false,
        error: {
          message: err.message,
          status: err.status,
          statusText: err.message,
          timestamp: new Date().toISOString(),
        },
      },
      err.status,
    );
  }

  // 예상치 못한 에러
  return c.json(
    {
      ok: false,
      error: {
        message: '서버에서 예상치 못한 오류가 발생했습니다.',
        status: 500,
        statusText: 'Internal Server Error',
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { details: err.message }),
      },
    },
    500,
  );
};
