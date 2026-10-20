import { PasswordRule } from '@/lib/constants/password-rule';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.email(),
  password: PasswordRule,
});

export type SignInSchema = z.infer<typeof SignInSchema>;
