/**
 * 애플리케이션 라우트 경로 상수
 * 경로 변경 시 한 곳에서만 수정하면 되도록 중앙 관리
 */

export const ROUTES = {
  // 인증
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',

  // 마이페이지
  MYPAGE: '/mypage',
  MYPAGE_EDIT: '/mypage/edit',

  // 메인
  HOME: '/',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];

