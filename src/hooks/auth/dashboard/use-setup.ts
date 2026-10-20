'use client';

import { SetupAdminSchema } from '@/components/pages/dashboard/auth/schema/setup-admin-schema';
import { useToast } from '@/hooks/custom/use-toast';
import { signUp } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useSetup = () => {
  const toast = useToast();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: SetupAdminSchema) => {
    setIsPending(true);
    const { name, email, password } = data;
    const signUpName = name || email;
    const res = await signUp.email({ name: signUpName, email, password });
    if (res.error) {
      toast.error(res.error.message);
      setIsPending(false);
      return;
    }
    router.push('/auth/admin/setup/owner-organization');
    return res;
  };

  return { handleSubmit, isPending };
};
