'use client';

import { SignInSchema } from '@/components/pages/dashboard/auth/schema/sign-in-schema';
import { useToast } from '@/hooks/custom/use-toast';
import { signIn } from '@/lib/auth/auth-client';
import { useState } from 'react';

export const useSignInAdmin = () => {
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: SignInSchema) => {
    setIsPending(true);
    const { email, password, rememberMe } = data;
    const res = await signIn.email({ email, password, callbackURL: '/admin', rememberMe });
    if (res.error) {
      switch (res.error.code) {
        case 'INVALID_EMAIL_OR_PASSWORD':
          toast.error('이메일 또는 비밀번호가 일치하지 않습니다.');
          break;
        default:
          toast.error(res.error.message);
      }
      setIsPending(false);
      return;
    }
    setIsPending(false);
    return res;
  };

  return { handleSubmit };
};
