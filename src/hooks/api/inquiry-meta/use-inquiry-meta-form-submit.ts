import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/custom/use-toast';
import { InquiryMetaFormSchema } from '@/components/pages/dashboard/inquiry-meta/form/inquiry-meta-form.schema';
import { useInquiryMetaCreate } from './use-inquiry-meta-create';
import { useInquiryMetaUpdate } from './use-inquiry-meta-update';

export function useInquiryMetaFormSubmit(id?: string) {
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: createMutate, isPending: isCreating } = useInquiryMetaCreate();
  const { mutateAsync: updateMutate, isPending: isUpdating } = useInquiryMetaUpdate(id || '');

  const handleSubmit = async (data: InquiryMetaFormSchema) => {
    const res = id ? await updateMutate(data) : await createMutate(data);

    if (res.ok) {
      router.push('/admin/inquiry-meta');
      toast.success(`문의 게시판이 ${id ? '수정' : '생성'}되었습니다.`);
    }
  };

  return { handleSubmit, isPending: isCreating || isUpdating };
}
