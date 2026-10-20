import { Context } from 'hono';
import { apiErrorHelpers } from '@/lib/hono/core';

export function handleError<T extends Context>(c: T, error: Error) {
  if (error.cause === 403) {
    return apiErrorHelpers.forbidden(c, error.message);
  }
  if (error.cause === 404) {
    return apiErrorHelpers.notFound(c, error.message);
  }
  if (error.cause === 400) {
    return apiErrorHelpers.badRequest(c, error.message);
  }
  return apiErrorHelpers.serverError(c, error.message);
}
