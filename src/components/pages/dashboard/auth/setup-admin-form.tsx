'use client';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { TextInput } from '@/components/custom-ui/form-ui/form-input';
import { SetupAdminSchema } from './schema/setup-admin-schema';
import { Shield } from 'lucide-react';
import { useSetup } from '@/hooks/auth/dashboard/use-setup';

export const SetupAdminForm = () => {
  const { handleSubmit, isPending } = useSetup();

  const form = useForm<SetupAdminSchema>({
    resolver: zodResolver(SetupAdminSchema),
  });

  return (
    <CommonForm handleSubmit={handleSubmit} formInstance={form} className="space-y-5">
      <div className="space-y-5">
        <TextInput schema={SetupAdminSchema} name="name" label="관리자 이름" placeholder="관리자 이름을 입력하세요" />
        <TextInput schema={SetupAdminSchema} name="email" label="이메일" placeholder="admin@example.com" type="email" />
        <TextInput
          schema={SetupAdminSchema}
          name="password"
          label="비밀번호"
          placeholder="8자 이상 입력하세요"
          type="password"
        />
        <TextInput
          schema={SetupAdminSchema}
          name="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          type="password"
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 h-12 w-full font-medium text-lg"
          disabled={isPending}
        >
          <Shield />
          {isPending ? '로딩 중' : '관리자 계정 생성'}
        </Button>
      </div>
    </CommonForm>
  );
};
