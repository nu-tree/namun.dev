'use client';

import { Button } from '@/components/ui/button';
import { useSocialLogin } from '@/hooks/api/auth/use-social-login';
import { signIn } from '@/lib/auth/auth-client';
import { cn } from '@/lib/utils/utils';
import { SiNaver } from 'react-icons/si';

type Props = React.HTMLAttributes<HTMLElement>;

export const NaverSignIn = ({ className }: Readonly<Props>) => {
  const { mutateAsync } = useSocialLogin();
  const handleNaverSignIn = async () => {
    await mutateAsync('naver');
  };

  return (
    <Button
      type="button"
      className={cn(
        'w-full text-white font-bold py-3 rounded-md h-12',
        'bg-[#02C75B] hover:bg-[#02C75B]/80',
        'shadow-[#02C75B]/30 shadow-lg',
      )}
      onClick={handleNaverSignIn}
    >
      <SiNaver className="size-5" />
      네이버로 시작하기
    </Button>
  );
};
