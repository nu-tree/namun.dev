'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { InquiryFormSchema } from './inquiry-form-schema';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { SelectInput, TextInput, TextAreaInput, CheckboxInput } from '@/components/custom-ui/form-ui/form-input';
import { Button } from '@/components/ui/button';
import { useInquiryMetaList } from '@/hooks/api/inquiry-meta/use-inquiry-meta-list';
import { useInquiryFormSubmit } from '@/hooks/api/inquiry/use-inquiry-form-submit';

export default function InquiryForm() {
  const { data } = useInquiryMetaList();
  const inquiryMetas = data?.data || [];
  const { handleSubmit, isPending } = useInquiryFormSubmit();

  const form = useForm<InquiryFormSchema>({
    resolver: zodResolver(InquiryFormSchema),
    defaultValues: {
      inquiryMetaId: '',
      title: '',
      content: '',
      contact: '',
      isSecret: true,
      isAnswered: false,
    },
  });

  // inquiryMetas 데이터가 로드된 후 기본값 설정
  useEffect(() => {
    if (inquiryMetas.length > 0) {
      form.setValue('inquiryMetaId', inquiryMetas[0].id);
    }
  }, [inquiryMetas, form]);

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-tight">문의 작성</h2>

        <CommonForm handleSubmit={handleSubmit} formInstance={form} className="space-y-6">
          <SelectInput
            schema={InquiryFormSchema}
            name="inquiryMetaId"
            label="문의 카테고리"
            options={inquiryMetas.map((meta) => ({
              label: meta.title,
              value: meta.id,
            }))}
          />

          <TextInput schema={InquiryFormSchema} name="title" label="제목" placeholder="문의 제목을 입력해주세요" />

          <TextAreaInput
            schema={InquiryFormSchema}
            name="content"
            label="내용"
            placeholder="문의 내용을 입력해주세요"
            rows={6}
          />

          <TextInput
            schema={InquiryFormSchema}
            name="contact"
            label="연락처"
            placeholder="연락처를 입력해주세요 (선택사항)"
          />

          <CheckboxInput schema={InquiryFormSchema} name="isSecret" label="비밀글" />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
            disabled={isPending}
          >
            {isPending ? '등록 중...' : '문의 등록'}
          </Button>

          {form.formState.isSubmitSuccessful && (
            <div className="text-green-600 mt-4 text-center font-medium">문의가 등록되었습니다.</div>
          )}

          {form.formState.errors.root && (
            <div className="text-red-600 mt-4 text-center font-medium">{form.formState.errors.root.message}</div>
          )}
        </CommonForm>
      </div>
    </div>
  );
}
