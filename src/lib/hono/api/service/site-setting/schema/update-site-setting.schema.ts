import z from 'zod';
import { SiteSettingSchema } from './site-setting.schema';

export const UpdateSiteSettingSchema = SiteSettingSchema.pick({
  key: true,
  value: true,
});
export type UpdateSiteSettingSchema = z.infer<typeof UpdateSiteSettingSchema>;
