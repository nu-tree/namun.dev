'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { FetchFailure } from '@/lib/utils/fetch-client';
import { useToast } from './use-toast';
import { setApiErrorHandler, clearApiErrorHandler, type ErrorHandlerOptions } from '@/lib/utils/api-error-handler';
import { ERROR_MESSAGES } from '@/constants/error-messages';
import { ROUTES } from '@/constants/routes';
import { logger } from '@/lib/utils/logger';

/**
 * 중복 토스트 방지를 위한 타입
 */
type LastError = {
  message: string;
  timestamp: number;
};

/**
 * 중복 토스트 방지 시간 (밀리초)
 */
const DUPLICATE_TOAST_THRESHOLD = 3000;

/**
 * API 에러 처리를 위한 훅
 * 앱 최상위 레벨에서 한 번만 호출하여 전역 에러 핸들러를 설정
 */
export function useApiErrorHandler() {
  const router = useRouter();
  const toast = useToast();
  const lastErrorRef = useRef<LastError | null>(null);

  useEffect(() => {
    /**
     * 중복 토스트 체크
     */
    const shouldShowToast = (message: string): boolean => {
      const now = Date.now();
      const lastError = lastErrorRef.current;

      // 동일한 메시지가 3초 이내에 발생하면 무시
      if (lastError?.message === message && now - lastError.timestamp < DUPLICATE_TOAST_THRESHOLD) {
        logger.warn('Duplicate toast prevented', { message });
        return false;
      }

      lastErrorRef.current = { message, timestamp: now };
      return true;
    };

    /**
     * API 에러 처리 함수
     */
    const handleApiError = (error: FetchFailure, options?: ErrorHandlerOptions) => {
      // 401 Unauthorized - 로그인 필요
      if (error.error.status === 401) {
        if (shouldShowToast(ERROR_MESSAGES.UNAUTHORIZED)) {
          toast.error(ERROR_MESSAGES.UNAUTHORIZED);
        }
        if (!options?.disableRedirect) {
          router.push(ROUTES.SIGN_IN);
        }
        return;
      }

      // 403 Forbidden + 본인인증 필요
      const errorCode = error.error.code || error.error.details?.code;
      if (error.error.status === 403 && errorCode === 'CERTIFICATION_REQUIRED') {
        if (shouldShowToast(ERROR_MESSAGES.CERTIFICATION_REQUIRED)) {
          toast.error(ERROR_MESSAGES.CERTIFICATION_REQUIRED);
        }
        if (!options?.disableRedirect) {
          router.push(ROUTES.MYPAGE_EDIT);
        }
        return;
      }

      // 403 Forbidden (일반)
      if (error.error.status === 403) {
        if (shouldShowToast(ERROR_MESSAGES.FORBIDDEN)) {
          toast.error(ERROR_MESSAGES.FORBIDDEN);
        }
        return;
      }

      // 404 Not Found
      if (error.error.status === 404) {
        if (shouldShowToast(ERROR_MESSAGES.NOT_FOUND)) {
          toast.error(ERROR_MESSAGES.NOT_FOUND);
        }
        return;
      }

      // 500+ 서버 에러
      if (error.error.status >= 500) {
        if (shouldShowToast(ERROR_MESSAGES.SERVER_ERROR)) {
          toast.error(ERROR_MESSAGES.SERVER_ERROR);
        }
        logger.error('Server error', {
          status: error.error.status,
          message: error.error.message,
        });
        return;
      }

      // 네트워크 에러 (status: 0)
      if (error.error.status === 0) {
        const message = error.error.message || ERROR_MESSAGES.NETWORK;
        if (shouldShowToast(message)) {
          toast.error(message);
        }
        return;
      }

      // 기타 에러
      const message = error.error.message || ERROR_MESSAGES.UNKNOWN;
      if (shouldShowToast(message)) {
        toast.error(message);
      }
    };

    // 전역 에러 핸들러 등록
    setApiErrorHandler(handleApiError);

    // 컴포넌트 언마운트 시 핸들러 제거
    return () => {
      clearApiErrorHandler();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // router와 toast는 안정적이므로 의존성 제외
}
