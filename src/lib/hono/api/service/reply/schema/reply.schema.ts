import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';

/** 답변 기본 스키마 */
export const ReplySchema = ItemCoreSchema.extend({
  content: z.string(),
  inquiryId: z.string(),
  userId: z.string(),
});

export type ReplySchema = z.infer<typeof ReplySchema>;
