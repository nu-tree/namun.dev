import { BoardSchema } from './board.schema';
import { z } from 'zod';

/** 관리자페이지 게시판 생성 req */
export const UpdateBoardSchema = BoardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({});
export type UpdateBoardSchema = z.infer<typeof UpdateBoardSchema>;
