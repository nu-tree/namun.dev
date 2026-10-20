import { z } from 'zod';
import { getListResponseSchema, PaginationSearchSchema } from '@/lib/hono/api/shared/schema';
import { PopupDisplayType, PopupSchema } from './popup-schema';

/** 관리자페이지 목록조회 req */
export const GetPopupListRequestSchema = PaginationSearchSchema;
export type GetPopupListRequestSchema = z.infer<typeof GetPopupListRequestSchema>;

/** 사용자페이지 조회 req */
export const GetPopupForPlatformRequest = PopupSchema.pick({
  displayType: true,
  displayPages: true,
}).partial();
export type GetPopupForPlatformRequest = z.infer<typeof GetPopupForPlatformRequest>;

/** 관리자페이지 목록조회 res */
export const GetPopupListResponseSchema = getListResponseSchema(PopupSchema);
export type GetPopupListResponseSchema = z.infer<typeof GetPopupListResponseSchema>;
