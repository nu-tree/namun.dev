'use client';

import { useToast } from '@/hooks/custom/use-toast';
import { phoneNumber } from '@/lib/auth/auth-client';
import { useState } from 'react';

/** SMS OTP 인증 문자 발송 훅 */
export const useSendSmsVerification = () => {
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (phoneNumberValue: string) => {
    setIsPending(true);
    const res = await phoneNumber.sendOtp({ phoneNumber: phoneNumberValue });

    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success('인증 문자가 발송되었습니다.');
    }

    setIsPending(false);
    return res;
  };

  return { handleSubmit, isPending };
};
