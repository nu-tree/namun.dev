'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddOrganizationMemberSchema } from '@/lib/hono/api/service/organization/schema/create-organization.schema';
import { useParams } from 'next/navigation';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { TextInput } from '@/components/custom-ui/form-ui/form-input';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/utils';
import { useOrganizationMemberAdd } from '@/hooks/api/organization/use-organization-member-add';
import { LoadingUi } from '../../common-ui/loading-ui';
import { useOrganizationMemberList } from '@/hooks/api/organization/use-organization-member-list';

type Props = HTMLAttributes<HTMLDivElement>;

export const AddMemberForm = ({ className }: Props) => {
  const { id: organizationId } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useOrganizationMemberAdd();
  const { refetch } = useOrganizationMemberList(organizationId);

  const form = useForm<AddOrganizationMemberSchema>({
    resolver: zodResolver(AddOrganizationMemberSchema),
    defaultValues: {
      organizationId: organizationId,
      email: '',
      name: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: AddOrganizationMemberSchema) => {
    await mutateAsync(data);
    refetch();
    form.reset({
      organizationId,
      email: '',
      name: '',
      phoneNumber: '',
    });
  };

  return (
    <div className={cn('space-y-4', className)}>
      {isPending ? (
        <LoadingUi />
      ) : (
        <CommonForm formInstance={form} handleSubmit={onSubmit}>
          <TextInput
            schema={AddOrganizationMemberSchema}
            name="email"
            label="이메일"
            placeholder="이메일을 입력하세요"
            type="email"
          />

          <TextInput schema={AddOrganizationMemberSchema} name="name" label="이름" placeholder="이름을 입력하세요" />

          <TextInput
            schema={AddOrganizationMemberSchema}
            name="phoneNumber"
            label="전화번호"
            placeholder="전화번호를 입력하세요"
          />
          <Button type="submit" disabled={isPending} className="w-full">
            멤버 추가
          </Button>
        </CommonForm>
      )}
    </div>
  );
};
