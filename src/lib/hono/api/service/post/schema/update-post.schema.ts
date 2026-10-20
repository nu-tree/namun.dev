import { z } from 'zod';
import { PostSchema } from '@/lib/hono/api/service/post/schema/post.schema';

/** 관리자페이지 게시물 수정 req */
export const UpdatePostSchema = PostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export type UpdatePostSchema = z.infer<typeof UpdatePostSchema>;
