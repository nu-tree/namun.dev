'use client';

import { Button } from '@/components/ui/button';
import { useSocialLogin } from '@/hooks/api/auth/use-social-login';
import { signIn } from '@/lib/auth/auth-client';
import { cn } from '@/lib/utils/utils';
import { RiKakaoTalkFill } from 'react-icons/ri';

type Props = React.HTMLAttributes<HTMLElement>;

export const KakaoSignIn = ({ className }: Readonly<Props>) => {
  const { mutateAsync } = useSocialLogin();
  const handleKakaoSignIn = async () => {
    await mutateAsync('kakao');
  };

  return (
    <Button
      type="button"
      className={cn(
        'w-full text-black font-bold py-2 rounded-md h-12',
        'bg-[#FFE814] hover:bg-[#FFE814]/80',
        'shadow-[#FFE814]/30 shadow-lg',
      )}
      onClick={handleKakaoSignIn}
    >
      <RiKakaoTalkFill className="size-8" />
      카카오로 시작하기
    </Button>
  );
};
