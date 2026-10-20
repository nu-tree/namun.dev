'use client';

import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MyInfoFormSchema } from './my-info-form-schema';
import useMyPageFormSubmit from '@/hooks/pages/my-page/use-my-page-form-submit';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { TextInput } from '@/components/custom-ui/form-ui/form-input';
import { useUserOne } from '@/hooks/api/user/use-user-one';
import { useSendEmailVerification } from '@/hooks/auth/platform/use-send-email-verification';

export default function BasicForm({ id }: { id?: string }) {
  const { data: user, isLoading } = useUserOne(id || '');
  const { onMyPageSubmit, isPending } = useMyPageFormSubmit(id);
  const { handleSubmit: handleSubmitVerification, isPending: isVerificationPending } = useSendEmailVerification();
  const form = useForm<MyInfoFormSchema>({
    resolver: zodResolver(MyInfoFormSchema),
    values: {
      name: user?.name || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <CommonForm formInstance={form} handleSubmit={onMyPageSubmit}>
      <TextInput schema={MyInfoFormSchema} name="name" label="이름" />
      <TextInput schema={MyInfoFormSchema} name="phoneNumber" label="휴대폰 번호" />

      <div className="space-y-2">
        <Label>이메일</Label>
        <div className="p-1 text-sm">{user?.email}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Label>{user?.emailVerified ? '이메일 인증 완료' : '이메일 미인증'}</Label>
          {!user?.emailVerified && (
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => handleSubmitVerification(user?.email || '')}
            >
              {isVerificationPending ? '인증 중...' : '인증하기'}
            </Button>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? '수정 중...' : '수정하기'}
      </Button>
    </CommonForm>
  );
}
