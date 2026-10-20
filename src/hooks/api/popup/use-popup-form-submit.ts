import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/custom/use-toast';
import { PopupFormSchema } from '@/components/pages/dashboard/popups/form/popup-form-schema';
import { usePopupCreate } from '@/hooks/api/popup/use-popup-create';
import { usePopupUpdate } from '@/hooks/api/popup/use-popup-update';
import { uploadFileOne } from '@/lib/s3-service/s3-uploader';
import { usePopupOne } from './use-popup-one';
import { usePopupList } from './use-popup-list';
import { useState } from 'react';

export function usePopupFormSubmit(id?: string) {
  const router = useRouter();
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync: createMutate } = usePopupCreate();
  const { mutateAsync: updateMutate } = usePopupUpdate(id || '');
  const { refetch } = usePopupOne(id || '');
  const { refetch: refetchList } = usePopupList();

  const handleSubmit = async (data: PopupFormSchema) => {
    setIsPending(true);
    const imageUrl = await uploadFileOne(data.content, 'popup');
    if (!imageUrl) {
      toast.error('파일 업로드에 실패했습니다.');
      throw new Error('파일 업로드에 실패했습니다.');
    }

    const formData = {
      ...data,
      content: imageUrl,
    };
    // 데이터 제출
    const res = id ? await updateMutate(formData) : await createMutate(formData);
    if (res.ok) {
      refetch();
      refetchList();
      router.push('/admin/popups');
      toast.success(`팝업이 ${id ? '수정' : '생성'}되었습니다.`);
    }
    setIsPending(false);
  };

  return { handleSubmit, isPending };
}
