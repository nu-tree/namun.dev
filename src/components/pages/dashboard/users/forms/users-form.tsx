'use client';

import { cn } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TextInput, FormButtons } from '@/components/custom-ui/form-ui/form-input';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { MemberFormNewPassword } from './new-password-input';
import { useEffect } from 'react';
import { UsersFormSchema } from './user-form-schema';
import { useToast } from '@/hooks/custom/use-toast';
import { useUserOne } from '@/hooks/api/user/use-user-one';
import { useUserUpdate } from '@/hooks/api/user/use-user-update';

export const UserForm = ({ id }: { id?: string }) => {
  const toast = useToast();
  const { data, refetch, isLoading } = useUserOne(id || '');
  const { mutateAsync, isPending } = useUserUpdate(id || '');

  const form = useForm<UsersFormSchema>({
    resolver: zodResolver(UsersFormSchema),
    defaultValues: {
      role: 'user',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const handleSubmit = async (data: UsersFormSchema) => {
    const result = await mutateAsync(data);
    if (!result.ok) {
      toast.error('회원 수정에 실패했습니다.', {
        description: result.error.message,
      });
      return;
    }

    toast.success('회원이 수정되었습니다.');
    refetch();
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <CommonForm handleSubmit={handleSubmit} formInstance={form} className="space-y-4">
      <TextInput schema={UsersFormSchema} name="name" label="이름" placeholder="ex) 홍길동" className={cn('w-full')} />
      <TextInput
        schema={UsersFormSchema}
        name="email"
        label="이메일"
        placeholder="ex) example@example.com"
        className={cn('w-full')}
      />
      <TextInput
        schema={UsersFormSchema}
        name="phoneNumber"
        label="전화번호"
        placeholder="ex) 010-1234-5678"
        className={cn('w-full')}
      />
      <MemberFormNewPassword />
      <FormButtons buttonName="회원" isLoading={isPending} isEditMode={!!id} />
    </CommonForm>
  );
};
