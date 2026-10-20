import { BannerItemSchema, BannerSchema } from '@/lib/hono/api/service/banner/schema/banner.schema';
import { z } from 'zod';

/** 관리자페이지 배너 생성/수정 폼 req */
export const BannerFormSchema = BannerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  bannerItems: true,
})
  .extend({
    bannerItems: z.array(
      BannerItemSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        bannerId: true,
        imageUrl: true,
        startDate: true,
        endDate: true,
      })
        .extend({
          imageUrl: z.union([z.string(), z.instanceof(File)]),
          startDate: z.date(),
          endDate: z.date().optional(),
        })
        .refine((data) => !data.endDate || data.endDate >= data.startDate, {
          message: '종료일은 시작일보다 빠를 수 없습니다.',
          path: ['endDate'],
        }),
    ),
  })
  .superRefine((data, ctx) => {
    if (data.bannerItems.length === 0) {
      ctx.addIssue({
        path: ['bannerItems'],
        message: '배너 아이템을 추가하세요.',
        code: 'custom',
      });
    }
  });

export type BannerFormSchema = z.infer<typeof BannerFormSchema>;
