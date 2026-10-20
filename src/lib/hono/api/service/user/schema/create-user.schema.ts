import { UserSchema } from './user.schema';
import z from 'zod';

export const CreateUsersSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateUsersSchema = z.infer<typeof CreateUsersSchema>;
