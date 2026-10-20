'use client';

import { useToast } from '@/hooks/custom/use-toast';
import { verifyEmail } from '@/lib/auth/auth-client';
import { useState } from 'react';

export const useVerifyEmail = () => {
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (token: string) => {
    setIsPending(true);
    const res = await verifyEmail({ query: { token } });

    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success('이메일 인증이 완료되었습니다.');
    }

    setIsPending(false);
    return res;
  };

  return { handleSubmit, isPending };
};
