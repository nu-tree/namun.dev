import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';

/** 사이트 설정 키 타입 */
export const SiteSettingKeyType = z.enum([
  'analytics_google',
  'gtm_google',
  'analytics_naver',
  'naver_site_verification',
  'seo_site_name',
  'seo_site_description',
  'seo_site_keywords',
  'seo_site_image',
  'seo_og_description',
  'favicon_image',
]);
export type SiteSettingKeyType = z.infer<typeof SiteSettingKeyType>;

/** 사이트 설정 기본 스키마 */
export const SiteSettingSchema = ItemCoreSchema.extend({
  key: SiteSettingKeyType,
  value: z.string(),
});
export type SiteSettingSchema = z.infer<typeof SiteSettingSchema>;
