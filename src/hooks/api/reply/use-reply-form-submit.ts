import { useToast } from '@/hooks/custom/use-toast';
import { useReplyCreate } from './use-reply-create';
import { useReplyUpdate } from './use-reply-update';
import { ReplyFormSchema } from '@/components/pages/dashboard/inquiry/forms/reply-form-schema';
import { useReplyOneByInquiryId } from './use-reply-one-by-inquiry-id';

export function useReplyFormSubmit(id?: string, inquiryId?: string) {
  const toast = useToast();
  const { refetch } = useReplyOneByInquiryId(inquiryId || '');
  const { mutateAsync: createMutate, isPending: isCreating } = useReplyCreate();
  const { mutateAsync: updateMutate, isPending: isUpdating } = useReplyUpdate(id || '');
  const handleSubmit = async (data: ReplyFormSchema) => {
    const res = id ? await updateMutate(data) : await createMutate(data);

    if (res.ok) {
      refetch();
      toast.success(`답변이 ${id ? '수정' : '생성'}되었습니다.`);
    }
  };

  return { handleSubmit, isPending: isCreating || isUpdating };
}
