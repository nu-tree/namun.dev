import { getListResponseSchema, PaginationSearchSchema } from '@/lib/hono/api/shared/schema';
import { PostSchema } from './post.schema';
import { z } from 'zod';

/** 관리자페이지 목록조회 req */
export const GetPostListRequestSchema = PaginationSearchSchema.extend({
  boardSlug: z.string().optional(),
});
export type GetPostListRequestSchema = z.infer<typeof GetPostListRequestSchema>;

/** 관리자페이지 게시판 목록조회 res */
export const GetPostListResponseSchema = getListResponseSchema(PostSchema);
export type GetPostListResponseSchema = z.infer<typeof GetPostListResponseSchema>;
