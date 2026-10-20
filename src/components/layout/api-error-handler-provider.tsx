'use client';

import { useApiErrorHandler } from '@/hooks/custom/use-api-error-handler';

/**
 * API 에러 핸들러를 전역으로 등록하는 Provider 컴포넌트
 * 루트 레이아웃에서 한 번만 사용
 */
export function ApiErrorHandlerProvider({ children }: { children: React.ReactNode }) {
  useApiErrorHandler();
  return <>{children}</>;
}
