import { CreatePopupSchema } from '@/lib/hono/api/service/popup/schema/create-popup.schema';
import { z } from 'zod';

export const PopupFormSchema = CreatePopupSchema.extend({
  content: z.union([z.string(), z.instanceof(File)]),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.endDate >= data.startDate;
    }
    return true;
  },
  {
    message: '종료일은 시작일보다 빠를 수 없습니다.',
    path: ['endDate'],
  },
);
export type PopupFormSchema = z.infer<typeof PopupFormSchema>;
