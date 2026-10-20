'use client';

import { useToast } from '@/hooks/custom/use-toast';
import { sendVerificationEmail } from '@/lib/auth/auth-client';
import { useState } from 'react';

/** 이메일 인증 메일 발송 훅 */
export const useSendEmailVerification = () => {
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (email: string) => {
    setIsPending(true);
    const res = await sendVerificationEmail({ email });

    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success('인증 메일이 발송되었습니다.');
    }

    setIsPending(false);
    return res;
  };

  return { handleSubmit, isPending };
};
