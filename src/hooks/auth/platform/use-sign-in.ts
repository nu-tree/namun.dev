'use client';

import { SignInSchema } from '@/components/pages/auth/schema/sign-in-schema';
import { useToast } from '@/hooks/custom/use-toast';
import { signIn } from '@/lib/auth/auth-client';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useSignIn = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: SignInSchema) => {
    const { email, password } = data;
    setIsPending(true);
    const res = await signIn.email({ email, password, callbackURL: '/admin' });
    if (res.error) {
      switch (res.error.code) {
        case 'INVALID_EMAIL_OR_PASSWORD':
          toast.error('이메일 또는 비밀번호가 일치하지 않습니다.');
          break;
        default:
          toast.error(res.error.message);
      }
    } else {
      // 로그인 성공 시 세션 쿼리 무효화 및 리패치하여 헤더 즉시 업데이트
      await queryClient.invalidateQueries({ queryKey: ['session'] });
      await queryClient.refetchQueries({ queryKey: ['session'] });
    }
    setIsPending(false);
    return res;
  };

  return { handleSubmit, isPending };
};
