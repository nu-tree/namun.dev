import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';

/** 댓글 기본 스키마 */
export const CommentSchema = ItemCoreSchema.extend({
  content: z.string(),
  postId: z.string(),
  username: z.string().nullable(),
  userId: z.string().nullable(),
  parentId: z.string().nullable(),
});

export type CommentSchema = z.infer<typeof CommentSchema>;
