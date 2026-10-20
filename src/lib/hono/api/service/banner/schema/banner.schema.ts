import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';

/** 배너 아이템 조회 타입 */
export const BannerDisplayTypeSchema = z.enum(['ALL', 'PC', 'MOBILE']);
export type BannerDisplayTypeSchema = z.infer<typeof BannerDisplayTypeSchema>;

/** 배너 아이템 기본 스키마 */
export const BannerItemSchema = ItemCoreSchema.extend({
  displayOrder: z.number(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  imageUrl: z.string(),
  linkUrl: z.string().nullable().optional(),
  displayType: BannerDisplayTypeSchema,
  bannerId: z.string(),
});
export type BannerItemSchema = z.infer<typeof BannerItemSchema>;

/** 배너 기본 스키마 */
export const BannerSchema = ItemCoreSchema.extend({
  slug: z.string(),
  isView: z.boolean(),
  bannerWidth: z.number(),
  bannerHeight: z.number(),
  bannerItems: z.array(BannerItemSchema).optional(),
});
export type BannerSchema = z.infer<typeof BannerSchema>;
