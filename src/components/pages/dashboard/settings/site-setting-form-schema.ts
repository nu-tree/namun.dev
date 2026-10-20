import { UpdateSiteSettingSchema } from '@/lib/hono/api/service/site-setting/schema/update-site-setting.schema';
import z from 'zod';

export const SiteSettingFormSchema = UpdateSiteSettingSchema.extend({
  value: z.union([z.string(), z.instanceof(File)]),
});
export type SiteSettingFormSchema = z.infer<typeof SiteSettingFormSchema>;
