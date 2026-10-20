import { z } from 'zod';
import { ReplySchema } from './reply.schema';

/** 답변 생성 요청 */
export const CreateReplySchema = ReplySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});
export type CreateReplySchema = z.infer<typeof CreateReplySchema>;

/** 답변 수정 요청 */
export const UpdateReplySchema = CreateReplySchema;
export type UpdateReplySchema = z.infer<typeof UpdateReplySchema>;
