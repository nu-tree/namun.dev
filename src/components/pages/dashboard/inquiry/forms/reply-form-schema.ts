import { z } from 'zod';
import { CreateReplySchema } from '@/lib/hono/api/service/reply/schema/create-reply.schema';

export const ReplyFormSchema = CreateReplySchema;
export type ReplyFormSchema = z.infer<typeof ReplyFormSchema>;
