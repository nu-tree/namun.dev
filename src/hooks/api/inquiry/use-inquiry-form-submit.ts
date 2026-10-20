import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/custom/use-toast';
import { InquiryFormSchema } from '@/components/pages/platform/sub-page/inquiry/inquiry-form-schema';
import { useInquiryCreate } from './use-inquiry-create';
import { useInquiryUpdate } from './use-inquiry-update';

export function useInquiryFormSubmit(id?: string) {
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: createMutate, isPending: isCreating } = useInquiryCreate();
  const { mutateAsync: updateMutate, isPending: isUpdating } = useInquiryUpdate(id || '');

  const handleSubmit = async (data: InquiryFormSchema) => {
    const res = id ? await updateMutate(data) : await createMutate(data);

    if (res.ok) {
      router.push('/admin/inquiry');
      toast.success(`문의가 ${id ? '수정' : '생성'}되었습니다.`);
    }
  };

  return { handleSubmit, isPending: isCreating || isUpdating };
}
