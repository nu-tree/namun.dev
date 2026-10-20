/**
 * API 에러 핸들러 등록 및 처리
 * 클라이언트에서만 사용 가능
 */

import type { FetchFailure } from './fetch-client';
import { logger } from './logger';

export type ErrorHandlerOptions = {
  disableRedirect?: boolean;
};

type ErrorHandler = (error: FetchFailure, options?: ErrorHandlerOptions) => void;

let globalErrorHandler: ErrorHandler | null = null;

/**
 * 전역 에러 핸들러 설정
 * 클라이언트 컴포넌트에서 초기화 시 호출
 */
export function setApiErrorHandler(handler: ErrorHandler) {
  globalErrorHandler = handler;
  logger.info('API Error Handler registered');
}

/**
 * 전역 에러 핸들러 제거
 */
export function clearApiErrorHandler() {
  globalErrorHandler = null;
  logger.info('API Error Handler cleared');
}

/**
 * 에러 발생 시 전역 핸들러 호출
 */
export function handleApiError(error: FetchFailure, options?: ErrorHandlerOptions) {
  if (!globalErrorHandler) {
    logger.error('API Error Handler not registered!', {
      status: error.error.status,
      message: error.error.message,
    });

    // 개발 환경에서는 명시적으로 에러 표시
    if (process.env.NODE_ENV === 'development') {
      console.error('⚠️ API Error Handler가 초기화되지 않았습니다. ApiErrorHandlerProvider를 추가하세요.', error);
    }
    return;
  }

  globalErrorHandler(error, options);
}
