import { getListResponseSchema, PaginationSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';
import { CommentSchema } from './comment.schema';

/** 댓글 목록 조회 req */
export const GetCommentsRequestSchema = PaginationSchema.extend({
  postId: z.string().optional(),
  userId: z.string().optional(),
});

export type GetCommentsRequestSchema = z.infer<typeof GetCommentsRequestSchema>;

/** 댓글 목록 조회 res */
export const GetCommentsResponseSchema = getListResponseSchema(CommentSchema);
export type GetCommentsResponseSchema = z.infer<typeof GetCommentsResponseSchema>;
