import { BannerItemSchema, BannerSchema } from './banner.schema';
import { z } from 'zod';

/** 관리자페이지 배너 생성/수정 req */
export const CreateBannerSchema = BannerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  bannerItems: true,
}).extend({
  bannerItems: z.array(
    BannerItemSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      bannerId: true,
    }),
  ),
});
export type CreateBannerSchema = z.infer<typeof CreateBannerSchema>;
