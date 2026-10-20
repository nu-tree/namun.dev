import { createMiddleware } from '../core/factory';

/**
 * API 키 기반 인증 가드 미들웨어
 *
 * 외부 서버에서 API를 호출할 때 사용하는 API 키 인증 미들웨어입니다.
 * 요청 헤더의 'x-api-key' 값을 환경변수 EXTERNAL_API_KEY와 비교합니다.
 *
 * @returns Hono 미들웨어 함수
 *
 * 동작 방식:
 * 1. 요청 헤더에서 'x-api-key' 값을 추출
 * 2. 환경변수 EXTERNAL_API_KEY와 비교
 * 3. 일치하지 않으면 401 Unauthorized 응답 반환
 * 4. 일치하면 다음 미들웨어/핸들러로 진행
 *
 * 사용 예시:
 * ```typescript
 * app.get('/api/users/total-count', apiKeyGuard(), async (c) => {
 *   // 회원 총수 반환
 * })
 * ```
 */
export const apiKeyGuard = () => {
  return createMiddleware(async (c, next) => {
    const apiKey = c.req.header('x-api-key');
    const expectedApiKey = process.env.EXTERNAL_API_KEY;

    if (!expectedApiKey) {
      return c.json({ message: 'API key is not configured' }, 500);
    }

    if (!apiKey || apiKey !== expectedApiKey) {
      return c.json({ message: 'Invalid API key' }, 401);
    }

    return next();
  });
};

