import { getListResponseSchema, PaginationSearchSchema } from '@/lib/hono/api/shared/schema';
import { BoardFeatureSchema, BoardSchema } from './board.schema';
import { z } from 'zod';

/** 관리자페이지 목록조회 req */
export const GetBoardListRequestSchema = PaginationSearchSchema;
export type GetBoardListRequestSchema = z.infer<typeof GetBoardListRequestSchema>;

/** 관리자페이지 게시판 목록조회 res */
export const GetBoardListResponseSchema = getListResponseSchema(BoardSchema);
export type GetBoardListResponseSchema = z.infer<typeof GetBoardListResponseSchema>;

/** 게시판 전체 SLUG 조회 res */
export const GetBoardSlugListResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      feature: BoardFeatureSchema,
    }),
  ),
});
export type GetBoardSlugListResponseSchema = z.infer<typeof GetBoardSlugListResponseSchema>;
