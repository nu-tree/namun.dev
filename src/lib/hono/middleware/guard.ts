import { USER_ROLE } from '@prisma-client/client';
import { createMiddleware } from '../core/factory';

/**
 * 사용자 인증 및 역할 기반 접근 제어(RBAC) 가드 미들웨어
 *
 * API 라우트에 대한 접근 권한을 제어하는 Hono 미들웨어입니다.
 * 인증된 사용자만 접근 가능하도록 하며, 선택적으로 특정 역할(role)을 가진 사용자만 허용할 수 있습니다.
 *
 * @param roles - 접근을 허용할 사용자 역할 배열 (선택 사항)
 *                예: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
 *                이 파라미터를 생략하면 로그인된 모든 사용자에게 접근을 허용합니다.
 *
 * @returns Hono 미들웨어 함수
 *
 * 동작 방식:
 * 1. 컨텍스트에서 인증된 사용자 정보를 추출합니다 (Better Auth를 통해 설정됨)
 * 2. 사용자가 인증되지 않은 경우 (로그인하지 않음) → 401 Unauthorized 응답 반환
 * 3. roles 파라미터가 제공된 경우:
 *    - 사용자의 역할이 허용된 역할 목록에 포함되어 있는지 확인
 *    - 포함되지 않은 경우 → 403 Forbidden 응답 반환
 * 4. 모든 검증을 통과하면 next()를 호출하여 다음 미들웨어 또는 핸들러로 진행
 *
 * 사용 예시:
 * ```typescript
 * // 로그인한 모든 사용자 허용
 * app.get('/api/profile', userGuard(), async (c) => { ... })
 *
 * // 관리자만 허용
 * app.delete('/api/users/:id', userGuard([USER_ROLE.ADMIN]), async (c) => { ... })
 *
 * // 관리자 또는 매니저만 허용
 * app.post('/api/posts', userGuard([USER_ROLE.ADMIN, USER_ROLE.MANAGER]), async (c) => { ... })
 * ```
 */
export const userGuard = (roles?: USER_ROLE[]) => {
  return createMiddleware(async (c, next) => {
    // Better Auth 미들웨어를 통해 설정된 사용자 정보를 컨텍스트에서 가져옴
    const user = c.get('user');

    // 인증되지 않은 사용자 처리 (세션이 없거나 만료됨)
    if (!user) return c.json({ message: 'Unauthorized' }, 401);

    // 역할 기반 접근 제어 검증
    // roles 배열이 제공되고 비어있지 않은 경우에만 역할 검증 수행
    if (roles && roles.length > 0 && !roles.includes(user.role as USER_ROLE)) {
      // 사용자의 역할이 허용된 역할 목록에 없으면 접근 거부
      return c.json({ message: 'Forbidden' }, 403);
    }

    // 모든 검증 통과 - 다음 미들웨어/핸들러로 진행
    return next();
  });
};
