import { UserSchema } from './user.schema';
import z from 'zod';

export const UpdateUsersSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  accounts: true,
});
export type UpdateUsersSchema = z.infer<typeof UpdateUsersSchema>;
