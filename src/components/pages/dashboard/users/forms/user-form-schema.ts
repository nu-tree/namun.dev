import { CreateUsersSchema } from '@/lib/hono/api/service/user/schema/create-user.schema';
import { z } from 'zod';

export const UsersFormSchema = CreateUsersSchema;
export type UsersFormSchema = z.infer<typeof UsersFormSchema>;

export const UserNewPasswordFormSchema = z.object({
  password: z.string(),
  id: z.string(),
});
export type UserNewPasswordFormSchema = z.infer<typeof UserNewPasswordFormSchema>;
