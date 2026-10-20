'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils/utils';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { TextInput } from '@/components/custom-ui/form-ui/form-input';
import { useSignUp } from '@/hooks/auth/platform/use-sign-up';
import { SignUpSchema } from './schema/sign-up-schema';

type Props = React.HTMLAttributes<HTMLElement>;

export const SignUpForm = ({ className }: Readonly<Props>) => {
  const { handleSubmit, isPending } = useSignUp();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {},
  });

  return (
    <CommonForm handleSubmit={handleSubmit} formInstance={form} className={cn('space-y-6 mt-8', className)}>
      <TextInput schema={SignUpSchema} name="name" label="이름" placeholder="이름" />
      <TextInput schema={SignUpSchema} name="email" label="이메일" placeholder="이메일" type="email" />
      <TextInput schema={SignUpSchema} name="password" label="비밀번호" placeholder="비밀번호" type="password" />
      <TextInput
        schema={SignUpSchema}
        name="passwordConfirm"
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        type="password"
      />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? '회원가입 중...' : '회원가입'}
      </Button>
    </CommonForm>
  );
};
