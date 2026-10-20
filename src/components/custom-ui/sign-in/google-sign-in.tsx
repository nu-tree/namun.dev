'use client';

import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth/auth-client';
import { cn } from '@/lib/utils/utils';
import { FaGoogle } from 'react-icons/fa';

type Props = React.HTMLAttributes<HTMLElement>;

export const GoogleSignIn = ({ className }: Readonly<Props>) => {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: 'google',
    });
  };

  return (
    <Button
      type="button"
      className={cn(
        'w-full text-gray-800 font-bold py-2 rounded-md h-12',
        'bg-white hover:bg-gray-50',
        'border-2 border-gray-200',
      )}
      onClick={handleGoogleSignIn}
    >
      <FaGoogle />
      구글로 시작하기
    </Button>
  );
};
