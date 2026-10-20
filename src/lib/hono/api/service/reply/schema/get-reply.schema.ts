import { z } from 'zod';
import { ReplySchema } from './reply.schema';

/** 답변 단건 조회 res (inquiryId로 조회) */
export const GetReplyResponseSchema = ReplySchema.extend({
  user: z.object({
    name: z.string().nullable(),
  }),
});
export type GetReplyResponseSchema = z.infer<typeof GetReplyResponseSchema>;
