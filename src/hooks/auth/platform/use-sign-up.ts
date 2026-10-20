'use client';

import { SignUpSchema } from '@/components/pages/auth/schema/sign-up-schema';
import { useToast } from '@/hooks/custom/use-toast';
import { signUp } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * 회원가입 훅
 * 약관 동의 정보는 회원가입 후 별도로 저장됩니다.
 */
export const useSignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: SignUpSchema) => {
    setIsPending(true);
    try {
      const { name, email, phoneNumber, password } = data;
      const signUpName = name || email;

      const res = await signUp.email({
        name: signUpName,
        email,
        password,
        phoneNumber,
      });
      if (res.error) {
        switch (res.error.code) {
          case 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL':
            toast.error('이미 존재하는 이메일입니다.');
            break;
          default:
            toast.error(res.error.message);
        }
        return res;
      }

      router.push('/');

      return res;
    } finally {
      setIsPending(false);
    }
  };

  return { handleSubmit, isPending };
};
