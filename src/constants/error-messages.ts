/**
 * API 에러 메시지 상수
 * 에러 코드별로 사용자에게 표시할 메시지를 정의
 */

export const ERROR_MESSAGES = {
  // 인증 관련
  UNAUTHORIZED: '로그인이 필요합니다',

  // 권한 관련
  FORBIDDEN: '접근 권한이 없습니다',
  CERTIFICATION_REQUIRED: '본인인증이 필요합니다',

  // 리소스 관련
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다',

  // 서버 에러
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',

  // 네트워크 에러
  NETWORK: '네트워크 연결을 확인해주세요',

  // 기타
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

