import { CreateBoardSchema } from '@/lib/hono/api/service/board/schema/create-board.schema';
import z from 'zod';

export const BoardFormSchema = CreateBoardSchema.extend({
  slug: z.string().regex(/^[A-Za-z0-9_]+$/, {
    message: '영문자, 숫자, 밑줄( _ )만 입력할 수 있습니다.',
  }),
  isThumbAble: z.boolean().optional(),
  isAttachAble: z.boolean().optional(),
});
export type BoardFormSchema = z.infer<typeof BoardFormSchema>;
