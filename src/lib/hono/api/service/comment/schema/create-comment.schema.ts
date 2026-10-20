import { z } from 'zod';
import { CommentSchema } from './comment.schema';

/** 댓글 생성 요청 */
export const CreateCommentSchema = CommentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  username: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
});

export type CreateCommentSchema = z.infer<typeof CreateCommentSchema>;

/** 댓글 수정 요청 */
export const UpdateCommentSchema = CreateCommentSchema;
export type UpdateCommentSchema = z.infer<typeof UpdateCommentSchema>;
