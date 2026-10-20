import z from 'zod';
import { SiteSettingSchema } from './site-setting.schema';

/** 사이트 설정 개별 조회 스키마 */
export const GetSiteSettingSchema = SiteSettingSchema.pick({
  key: true,
});
export type GetSiteSettingSchema = typeof GetSiteSettingSchema;

/** 사이트 설정 목록 조회 스키마 */
export const GetSiteSettingListSchema = z.object({
  data: z.array(SiteSettingSchema),
});
export type GetSiteSettingListSchema = z.infer<typeof GetSiteSettingListSchema>;
