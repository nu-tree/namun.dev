'use client';
import { inferAdditionalFields, phoneNumberClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { adminClient, organizationClient, customSessionClient } from 'better-auth/client/plugins';
import type { auth } from '@/lib/auth';

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    organizationClient(),
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
    phoneNumberClient(),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  listAccounts,
  updateUser,
  deleteUser,
  admin,
  forgetPassword,
  resetPassword,
  changePassword,
  sendVerificationEmail,
  verifyEmail,
  phoneNumber,
} = authClient;

export type SignInEmailParams = Parameters<typeof signIn.email>[0];
export type SignUpEmailParams = Parameters<typeof signUp.email>[0];
