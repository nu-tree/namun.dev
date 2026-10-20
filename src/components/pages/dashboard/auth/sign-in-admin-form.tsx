'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { CheckboxInput, TextInput } from '@/components/custom-ui/form-ui/form-input';
import { SignInSchema } from './schema/sign-in-schema';
import { useSignInAdmin } from '@/hooks/auth/dashboard/use-sign-in-admin';

export const SignInAdminForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { handleSubmit } = useSignInAdmin();

  return (
    <CommonForm handleSubmit={handleSubmit} formInstance={form} className="space-y-5">
      <TextInput schema={SignInSchema} name="email" label="이메일" placeholder="honbab@example.com" type="email" />

      <TextInput
        schema={SignInSchema}
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        type="password"
      />

      <CheckboxInput schema={SignInSchema} name="rememberMe" label="로그인 상태 유지" />

      <Button type="submit" className="w-full">
        로그인
      </Button>
    </CommonForm>
  );
};
