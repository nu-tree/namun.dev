import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';

/** 게시물 기본 스키마 */
export const PostSchema = ItemCoreSchema.extend({
  deletedAt: z.string().nullable().optional(),
  isSecret: z.boolean(),
  password: z.string().nullable().optional(),
  title: z.string(),
  content: z.string(),
  username: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  boardId: z.string(),
  isDraft: z.boolean(),
  thumbnail: z.string().nullable().optional(),
  attachments: z.array(z.string()).optional(),
});
export type PostSchema = z.infer<typeof PostSchema>;
