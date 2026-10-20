'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { MyPasswordFormSchema } from './my-info-form-schema';
import useMyPageFormSubmit from '@/hooks/pages/my-page/use-my-page-form-submit';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { TextInput } from '@/components/custom-ui/form-ui/form-input';

export default function PasswordForm({ id }: { id?: string }) {
  const { onPasswordSubmit, isPasswordPending } = useMyPageFormSubmit(id);
  const form = useForm<MyPasswordFormSchema>({ resolver: zodResolver(MyPasswordFormSchema) });

  return (
    <CommonForm formInstance={form} handleSubmit={onPasswordSubmit}>
      <TextInput schema={MyPasswordFormSchema} type="password" name="oldPassword" label="현재 비밀번호" />
      <TextInput schema={MyPasswordFormSchema} type="password" name="newPassword" label="새 비밀번호" />
      <TextInput schema={MyPasswordFormSchema} type="password" name="confirmPassword" label="비밀번호 확인" />

      <Button type="submit" className="w-full" disabled={isPasswordPending}>
        {isPasswordPending ? '변경 중...' : '비밀번호 변경'}
      </Button>
    </CommonForm>
  );
}
