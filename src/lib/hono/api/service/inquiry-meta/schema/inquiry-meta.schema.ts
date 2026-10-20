import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';

/** 문의 메타 기본 스키마 */
export const InquiryMetaSchema = ItemCoreSchema.extend({
  title: z.string(),
  slug: z.string(),
  managerName: z.string().nullable().optional(),
  managerMail: z.string().nullable().optional(),
});

export type InquiryMetaSchema = z.infer<typeof InquiryMetaSchema>;
