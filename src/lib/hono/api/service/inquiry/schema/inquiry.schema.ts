import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';

/** 문의 기본 스키마 */
export const InquirySchema = ItemCoreSchema.extend({
  title: z.string(),
  content: z.string(),
  isAnswered: z.boolean(),
  inquiryMetaId: z.string(),
  userId: z.string().nullable().optional(),
  contact: z.string().nullable().optional(),
  isSecret: z.boolean(),
  replyId: z.string().nullable().optional(),
});

export type InquirySchema = z.infer<typeof InquirySchema>;

/** 문의 응답 기본 스키마 */
export const InquiryReplySchema = ItemCoreSchema.extend({
  deletedAt: z.coerce.date().nullable(),
  content: z.string(),
  inquiryId: z.string(),
  userId: z.string(),
});
export type InquiryReplySchema = z.infer<typeof InquiryReplySchema>;
