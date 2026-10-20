/**
 * 로깅 유틸리티
 * 개발/프로덕션 환경에 따라 다른 로깅 전략 사용
 */

type LogLevel = 'info' | 'warn' | 'error';

type LogContext = {
  [key: string]: unknown;
};

/**
 * 로그 출력 함수
 */
function log(level: LogLevel, message: string, context?: LogContext) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'error':
        console.error(prefix, message, context || '');
        break;
      case 'warn':
        console.warn(prefix, message, context || '');
        break;
      case 'info':
        console.log(prefix, message, context || '');
        break;
    }
  } else {
    // 프로덕션 환경에서는 에러 추적 서비스로 전송
    // 예: Sentry, LogRocket 등
    // Sentry.captureMessage(message, { level, extra: context });
  }
}

/**
 * 로거 객체
 */
export const logger = {
  /**
   * 정보성 로그
   */
  info: (message: string, context?: LogContext) => {
    log('info', message, context);
  },

  /**
   * 경고 로그
   */
  warn: (message: string, context?: LogContext) => {
    log('warn', message, context);
  },

  /**
   * 에러 로그
   */
  error: (message: string, context?: LogContext) => {
    log('error', message, context);
  },
};

