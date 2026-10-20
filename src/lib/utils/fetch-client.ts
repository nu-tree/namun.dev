/**
 * Fetch Client 유틸리티
 * 타입 안전성과 일관된 에러 처리를 제공하는 fetch 래퍼
 */

import { handleApiError } from './api-error-handler';

/**
 * 성공 응답 타입
 */
export type FetchSuccess<T> = {
  ok: true;
  data: T;
  status: number;
};

/**
 * API 에러 코드 타입
 */
export type ApiErrorCode = 'CERTIFICATION_REQUIRED' | 'VALIDATION_ERROR' | 'RESOURCE_NOT_FOUND' | string;

/**
 * 실패 응답 타입 (서버 응답과 일치)
 */
export type FetchFailure = {
  ok: false;
  error: {
    message: string;
    status: number;
    statusText?: string;
    code?: ApiErrorCode;
    details?: {
      code?: ApiErrorCode;
      [key: string]: unknown;
    };
    timestamp: string;
  };
};

/**
 * Fetch 결과 타입 (Result 패턴)
 */
export type FetchResult<T> = FetchSuccess<T> | FetchFailure;

/**
 * 에러를 처리할지 결정하는 헬퍼 함수
 */
function shouldHandleError(status: number, skipOption?: boolean | number[]): boolean {
  // skipErrorHandling이 없으면 항상 처리
  if (!skipOption) {
    return true;
  }

  // true면 모든 에러 스킵
  if (skipOption === true) {
    return false;
  }

  // 배열이면 해당 상태 코드만 스킵
  if (Array.isArray(skipOption)) {
    return !skipOption.includes(status);
  }

  return true;
}

type FetchOptions = Omit<RequestInit, 'body'> & {
  baseUrl?: string;
  params?: Record<string, string | number | boolean | string[] | undefined | null>;
  body?: BodyInit | Record<string, unknown>;
  /**
   * 에러 자동 처리 스킵 옵션
   * - true: 모든 에러 스킵
   * - number[]: 지정된 상태 코드만 스킵
   * 예: [400, 404] → 400, 404만 스킵, 401, 403, 500 등은 전역 핸들러로 처리
   */
  skipErrorHandling?: boolean | number[];
  /**
   * 401, 403 에러 시 자동 리다이렉트 비활성화
   * - true: 토스트만 표시하고 리다이렉트 안 함
   * - false (기본): 401은 로그인 페이지로, 403(본인인증)은 마이페이지로 자동 이동
   */
  disableRedirect?: boolean;
};

/**
 * 공통 fetch 래퍼
 */
export async function fetchClient<T>(url: string, options?: FetchOptions): Promise<FetchResult<T>> {
  try {
    const { params, body, baseUrl, ...fetchOptions } = options || {};

    const fetchBaseUrl = baseUrl ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

    const urlArray = [fetchBaseUrl, url];

    // URL params 처리
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // 배열인 경우 각 요소를 개별 파라미터로 추가
            value.forEach((item) => {
              searchParams.append(key, String(item));
            });
          } else {
            // 단일 값인 경우
            searchParams.append(key, String(value));
          }
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        urlArray.push(`?${queryString}`);
      }
    }
    const fullUrl = urlArray.join('');

    // 사용자가 지정한 헤더 content-type 확인
    const userHeaders = fetchOptions.headers;
    const hasUserContentType =
      userHeaders && Object.keys(userHeaders).some((key) => key.toLowerCase() === 'content-type');

    const autoHeaders: Record<string, string> = {};
    // 사용자가 지정한 content-type이 없고 body가 있으면 body의 타입에 따라 자동 설정
    if (!hasUserContentType && body) {
      if (body instanceof URLSearchParams) {
        autoHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
      } else if (body instanceof Blob) {
        autoHeaders['Content-Type'] = body.type || 'application/octet-stream';
      } else if (body instanceof FormData) {
      } else if (typeof body === 'object' || typeof body === 'string') {
        autoHeaders['Content-Type'] = 'application/json';
      }
      // FormData, ArrayBuffer 등은 기본값 없음
    }

    // body 타입에 따라 직렬화
    const isJsonBody = typeof body === 'object' && !(body instanceof FormData) && !(body instanceof Blob);
    const requestBody = body ? (isJsonBody ? JSON.stringify(body) : body) : undefined;

    // 요청 실행
    const response = await fetch(fullUrl, {
      ...fetchOptions,
      headers: {
        ...autoHeaders,
        ...fetchOptions.headers,
      },
      credentials: 'include',
      body: requestBody,
    });

    // 204 No Content
    if (response.status === 204) {
      return {
        ok: true,
        data: {} as T,
        status: response.status,
      };
    }

    // Response 파싱
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!isJson) {
      // JSON이 아닌 응답은 에러로 처리 (외부 API 등)
      const text = await response.text();
      const errorResult = {
        ok: false,
        error: {
          message: text || '서버에서 올바르지 않은 응답을 받았습니다.',
          status: response.status,
          statusText: response.statusText,
          timestamp: new Date().toISOString(),
        },
      } as FetchFailure;

      // 에러 자동 처리
      if (shouldHandleError(errorResult.error.status, options?.skipErrorHandling)) {
        handleApiError(errorResult, { disableRedirect: options?.disableRedirect });
        // 전역 핸들러가 처리했으므로 throw하여 함수 실행 중단
        throw new Error(errorResult.error.message);
      }

      return errorResult;
    }

    // 서버 응답을 그대로 반환 (이미 { ok, data/error } 구조)
    const serverResponse = await response.json();

    // 서버 응답이 예상된 구조인지 확인
    if (typeof serverResponse === 'object' && serverResponse !== null && 'ok' in serverResponse) {
      const result = serverResponse as FetchResult<T>;

      // 에러인 경우 자동 처리
      if (!result.ok && shouldHandleError(result.error.status, options?.skipErrorHandling)) {
        handleApiError(result, { disableRedirect: options?.disableRedirect });
        // 전역 핸들러가 처리했으므로 throw하여 함수 실행 중단
        throw new Error(result.error.message);
      }

      return result;
    }

    // 예상치 못한 응답 구조 (외부 API 등)
    const errorResult = {
      ok: false,
      error: {
        message: '서버에서 올바르지 않은 형식의 응답을 받았습니다.',
        status: response.status,
        statusText: response.statusText,
        details: serverResponse,
        timestamp: new Date().toISOString(),
      },
    } as FetchFailure;

    // 에러 자동 처리
    if (shouldHandleError(errorResult.error.status, options?.skipErrorHandling)) {
      handleApiError(errorResult, { disableRedirect: options?.disableRedirect });
      // 전역 핸들러가 처리했으므로 throw하여 함수 실행 중단
      throw new Error(errorResult.error.message);
    }

    return errorResult;
  } catch (error) {
    // 이미 throw된 에러는 재throw (전역 핸들러가 처리한 에러)
    if (error instanceof Error && error.message) {
      throw error;
    }

    const errorResult = {
      ok: false,
      error: {
        message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        status: 0,
        statusText: 'Network Error',
        timestamp: new Date().toISOString(),
      },
    } as FetchFailure;

    // 에러 자동 처리
    if (shouldHandleError(errorResult.error.status, options?.skipErrorHandling)) {
      handleApiError(errorResult, { disableRedirect: options?.disableRedirect });
      // 전역 핸들러가 처리했으므로 throw하여 함수 실행 중단
      throw new Error(errorResult.error.message);
    }

    return errorResult;
  }
}

/**
 * GET 요청
 */
export function fetchGet<T>(url: string, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<FetchResult<T>> {
  return fetchClient<T>(url, { ...options, method: 'GET' });
}

/**
 * POST 요청
 */
export function fetchPost<T, B extends FetchOptions['body'] = FetchOptions['body']>(
  url: string,
  body?: B,
  options?: Omit<FetchOptions, 'method' | 'body'>,
): Promise<FetchResult<T>> {
  return fetchClient<T>(url, { ...options, method: 'POST', body });
}

/**
 * PUT 요청
 */
export function fetchPut<T, B extends FetchOptions['body']>(
  url: string,
  body?: B,
  options?: Omit<FetchOptions, 'method' | 'body'>,
): Promise<FetchResult<T>> {
  return fetchClient<T>(url, { ...options, method: 'PUT', body });
}

/**
 * PATCH 요청
 */
export function fetchPatch<T, B extends FetchOptions['body']>(
  url: string,
  body?: B,
  options?: Omit<FetchOptions, 'method' | 'body'>,
): Promise<FetchResult<T>> {
  return fetchClient<T>(url, { ...options, method: 'PATCH', body });
}

/**
 * DELETE 요청
 */
export function fetchDelete<T, B extends FetchOptions['body'] = FetchOptions['body']>(
  url: string,
  body?: B,
  options?: Omit<FetchOptions, 'method' | 'body'>,
): Promise<FetchResult<T>> {
  return fetchClient<T>(url, { ...options, method: 'DELETE', body });
}
