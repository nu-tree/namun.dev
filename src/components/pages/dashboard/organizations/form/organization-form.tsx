'use client';

import { TextInput, FormButtons } from '@/components/custom-ui/form-ui/form-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { useOrganizationOne } from '@/hooks/api/organization/use-organization-one';
import { OrganizationFormSchema } from './organization-form-schema';
import { useOrganizationFormSubmit } from '@/hooks/api/organization/use-organization-form-submit';

export const OrganizationForm = ({ id }: { id?: string }) => {
  const { data } = useOrganizationOne(id || '');
  const { handleSubmit, isPending } = useOrganizationFormSubmit(id || '');
  const form = useForm<OrganizationFormSchema>({
    resolver: zodResolver(OrganizationFormSchema),
    defaultValues: {
      slug: '',
      name: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        slug: data.slug,
        name: data.name,
        logo: data.logo || '',
      });
    }
  }, [data]);

  return (
    <CommonForm handleSubmit={handleSubmit} formInstance={form} className="space-y-4">
      <TextInput
        schema={OrganizationFormSchema}
        name="slug"
        label="조직 ID"
        placeholder="조직 ID"
        description="영문자, 숫자, 밑줄(_)만 입력 가능"
      />
      <TextInput schema={OrganizationFormSchema} name="name" label="조직 이름" placeholder="조직 이름" />
      <TextInput
        schema={OrganizationFormSchema}
        name="logo"
        label="로고 URL"
        placeholder="https://example.com/logo.png"
      />
      <FormButtons buttonName="조직" isLoading={isPending} isEditMode={!!id} />
    </CommonForm>
  );
};
