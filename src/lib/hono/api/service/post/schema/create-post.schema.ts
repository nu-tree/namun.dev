import { z } from 'zod';
import { PostSchema } from '@/lib/hono/api/service/post/schema/post.schema';

/** 관리자페이지 게시물 생성 req */
export const CreatePostSchema = PostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;
