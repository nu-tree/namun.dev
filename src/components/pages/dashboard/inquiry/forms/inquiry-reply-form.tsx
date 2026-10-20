'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { FormButtons, TextAreaInput } from '@/components/custom-ui/form-ui/form-input';
import { DetailCard, StatusField } from '../../common-ui/detail-card';
import { ReplyFormSchema } from './reply-form-schema';
import { useReplyOneByInquiryId } from '@/hooks/api/reply/use-reply-one-by-inquiry-id';
import { useReplyDelete } from '@/hooks/api/reply/use-reply-delete';
import { useReplyFormSubmit } from '@/hooks/api/reply/use-reply-form-submit';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { useInquiryList } from '@/hooks/api/inquiry/use-inquiry-list';

/**
 * 문의 답변 작성/수정/삭제 폼 컴포넌트
 */
export function InquiryReplyForm({ id }: { id: string }) {
  const { refetch: retchList } = useInquiryList();
  const { data: reply, isLoading, error, refetch } = useReplyOneByInquiryId(id);
  const { mutateAsync: deleteMutate, isPending: isDeletePending } = useReplyDelete();
  const { handleSubmit, isPending } = useReplyFormSubmit(reply?.id, id);

  const form = useForm<ReplyFormSchema>({
    resolver: zodResolver(ReplyFormSchema),
    defaultValues: {
      inquiryId: id,
      content: '',
    },
  });

  // 답변 데이터 변경 시 폼 초기화
  useEffect(() => {
    if (reply) {
      form.reset({
        inquiryId: id,
        content: reply?.content || '',
      });
    }
  }, [reply?.id, reply?.content, id]);

  const isEditMode = Boolean(reply?.id);
  const isSubmitting = isPending || isDeletePending;

  const deleteReply = async () => {
    const res = await deleteMutate({ id: reply?.id || '' });
    if (res.ok) {
      refetch();
      retchList();
      form.reset({ inquiryId: id, content: '' });
    }
  };

  const statusFieldAction = isEditMode
    ? {
        label: '답변 삭제',
        onClick: () => deleteReply(),
        disabled: isSubmitting,
      }
    : undefined;

  const statusFieldInfo = isEditMode && reply ? `${format(new Date(reply.createdAt), 'yyyy.MM.dd HH:mm')}` : undefined;

  return (
    <DetailCard loading={isLoading} error={error ? '답변을 찾을 수 없습니다.' : null} className="pt-0">
      <StatusField
        label="답변 상태:"
        status={isEditMode ? 'completed' : 'pending'}
        statusText={isEditMode ? '답변 완료' : '답변 없음'}
        action={statusFieldAction}
        info={statusFieldInfo}
      />

      <CommonForm formInstance={form} handleSubmit={handleSubmit} className="mt-8">
        <TextAreaInput
          schema={ReplyFormSchema}
          className="[&_textarea]:min-h-25"
          name="content"
          label="답변 내용"
          placeholder="문의에 대한 답변을 입력해주세요..."
        />
        <FormButtons
          key={`answer-form-${id}-${isEditMode ? 'edit' : 'create'}`}
          buttonName="답변"
          isLoading={isSubmitting}
          isEditMode={isEditMode}
        />
      </CommonForm>
    </DetailCard>
  );
}
