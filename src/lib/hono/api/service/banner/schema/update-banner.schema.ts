import z from 'zod';
import { CreateBannerSchema } from './create-banner.schema';

export const UpdateBannerSchema = CreateBannerSchema;
export type UpdateBannerSchema = z.infer<typeof UpdateBannerSchema>;
