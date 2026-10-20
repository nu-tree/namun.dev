'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InquiryMetaFormSchema } from './inquiry-meta-form.schema';
import { FormButtons, TextInput } from '@/components/custom-ui/form-ui/form-input';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { useInquiryMetaFormSubmit } from '@/hooks/api/inquiry-meta/use-inquiry-meta-form-submit';
import { useInquiryMetaOne } from '@/hooks/api/inquiry-meta/use-inquiry-meta-one';
import { useEffect } from 'react';

export const InquiryMetaForm = ({ id }: { id?: string }) => {
  const { data, isLoading } = useInquiryMetaOne(id || '');
  const { handleSubmit, isPending } = useInquiryMetaFormSubmit(id);
  const form = useForm<InquiryMetaFormSchema>({
    resolver: zodResolver(InquiryMetaFormSchema),
    defaultValues: { title: '', slug: '', managerName: '', managerMail: '' },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        slug: data.slug,
        managerName: data.managerName || '',
        managerMail: data.managerMail || '',
      });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CommonForm formInstance={form} handleSubmit={handleSubmit}>
      <TextInput schema={InquiryMetaFormSchema} name="slug" placeholder="ex)pay" label="게시판 ID*" />
      <TextInput schema={InquiryMetaFormSchema} name="title" placeholder="ex)결제 문의" label="문의 게시판 이름*" />
      <TextInput schema={InquiryMetaFormSchema} name="managerName" placeholder="홍길동" label="관리자 이름" />
      <TextInput schema={InquiryMetaFormSchema} name="managerMail" placeholder="hong@gmail.com" label="관리자 이메일" />
      <FormButtons isEditMode={!!id} buttonName="문의 게시판" isLoading={isPending} />
    </CommonForm>
  );
};
