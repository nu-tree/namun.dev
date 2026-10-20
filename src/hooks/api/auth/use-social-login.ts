'use client';

import { signIn } from '@/lib/auth/auth-client';
import { useQueryState } from 'nuqs';
import { useToast } from '@/hooks/custom/use-toast';
import { useMutation } from '@tanstack/react-query';
import { tryCatch } from '@/lib/utils/try-catch';

export const useSocialLogin = () => {
  const toast = useToast();
  const [redirect] = useQueryState('redirect');

  const mutation = useMutation({
    mutationFn: async (provider: 'google' | 'naver' | 'kakao') => {
      const { error, data } = await tryCatch(async () => {
        return signIn.social({
          provider,
          callbackURL: redirect ? `/${redirect.startsWith('/') ? redirect.slice(1) : redirect}` : '/',
        });
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      // toast.success('로그인 성공');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
