'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { TextInput } from '@/components/custom-ui/form-ui/form-input';
import { useSignIn } from '@/hooks/auth/platform/use-sign-in';
import { SignInSchema } from './schema/sign-in-schema';

export const SignInForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, isPending } = useSignIn();

  return (
    <CommonForm handleSubmit={handleSubmit} formInstance={form} className="space-y-6 mt-8">
      <TextInput schema={SignInSchema} name="email" label="이메일" placeholder="이메일" type="email" />
      <TextInput schema={SignInSchema} name="password" label="비밀번호" placeholder="비밀번호" type="password" />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </CommonForm>
  );
};
