'use client';

import { useMutation } from '@tanstack/react-query';
import { changePassword, signOut } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/custom/use-toast';

type ChangePasswordParams = {
  oldPassword: string;
  newPassword: string;
};

/**
 * 비밀번호 변경 훅
 * 현재 비밀번호와 새 비밀번호를 사용하여 비밀번호를 변경
 */
export const useChangePassword = () => {
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ oldPassword, newPassword }: ChangePasswordParams) => {
      const res = await changePassword({
        currentPassword: oldPassword,
        newPassword,
      });
      if (res.error) {
        switch (res.error.code) {
          case 'INVALID_PASSWORD':
            throw new Error('현재 비밀번호가 일치하지 않습니다.');
          default:
            throw new Error(res.error.message || '비밀번호 변경에 실패했습니다.');
        }
      }
      return res;
    },
    onSuccess: async () => {
      toast.info('비밀번호가 변경되었습니다. 다시 로그인해주세요.');

      try {
        await signOut();
        router.push('/sign-in');
      } catch (error) {
        console.error('로그아웃 실패:', error);
        router.push('/sign-in');
      }
    },
    onError: (error) => {
      console.error('비밀번호 변경 실패:', error);
    },
  });
};
