import { getListResponseSchema, PaginationSearchSchema } from '@/lib/hono/api/shared/schema';
import { BannerSchema } from './banner.schema';
import { z } from 'zod';

/** 관리자페이지 목록조회 req */
export const GetBannerListRequestSchema = PaginationSearchSchema.extend({
  isView: z.boolean().optional(),
});
export type GetBannerListRequestSchema = z.infer<typeof GetBannerListRequestSchema>;

/** 관리자페이지 배너 목록조회 res */
export const GetBannerListResponseSchema = getListResponseSchema(BannerSchema);
export type GetBannerListResponseSchema = z.infer<typeof GetBannerListResponseSchema>;
