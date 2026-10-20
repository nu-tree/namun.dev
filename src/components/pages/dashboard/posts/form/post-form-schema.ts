import { CreatePostSchema } from '@/lib/hono/api/service/post/schema/create-post.schema';
import z from 'zod';

export const PostFormSchema = CreatePostSchema.extend({
  thumbnail: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable(),
  attachments: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});
export type PostFormSchema = z.infer<typeof PostFormSchema>;
