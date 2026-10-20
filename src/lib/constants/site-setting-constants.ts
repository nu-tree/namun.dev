import { z } from 'zod';

export const SiteSettingKeySchema = z.enum([
  'analytics_google',
  'analytics_naver',
  'seo_site_name',
  'seo_site_description',
  'seo_site_keywords',
  'seo_site_image',
]);

export const SiteSettingKey = SiteSettingKeySchema.enum;
export type SiteSettingKey = z.infer<typeof SiteSettingKeySchema>;

export const OWNER_ORG_SLUG = process.env.OWNER_ORG_SLUG || 'SITE_OWNER';
