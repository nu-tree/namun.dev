import z from 'zod';
import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';

export const UserRoleType = z.enum(['user', 'admin']);
export type UserRoleType = z.infer<typeof UserRoleType>;

// Account 스키마
export const AccountSchema = z.object({
  providerId: z.string(),
  accountId: z.string(),
  email: z.string().nullable().optional(),
});
export type AccountSchema = z.infer<typeof AccountSchema>;

export const UserSchema = ItemCoreSchema.extend({
  name: z.string().nullable().optional(),
  email: z.email(),
  phoneNumber: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  emailVerified: z.boolean(),
  isCertified: z.boolean().optional(),
  sex: z.string().nullable().optional(),
  role: UserRoleType,
  accounts: z.array(AccountSchema).optional(),
});
export type UserSchema = z.infer<typeof UserSchema>;
