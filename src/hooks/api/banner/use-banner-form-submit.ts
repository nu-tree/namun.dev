import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/custom/use-toast';
import { BannerFormSchema } from '@/components/pages/dashboard/banners/form/banner-form-schema';
import { useBannerCreate } from '@/hooks/api/banner/use-banner-create';
import { useBannerUpdate } from '@/hooks/api/banner/use-banner-update';
import { uploadFileOne } from '@/lib/s3-service/s3-uploader';
import { useState } from 'react';

export function useBannerFormSubmit(id?: string) {
  const router = useRouter();
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync: createMutate } = useBannerCreate();
  const { mutateAsync: updateMutate } = useBannerUpdate(id || '');

  const handleSubmit = async (data: BannerFormSchema) => {
    setIsPending(true);
    const formData = {
      ...data,
      bannerItems: await Promise.all(
        data.bannerItems.map(async (item) => ({
          ...item,
          imageUrl: await uploadFileOne(item.imageUrl),
          startDate: new Date(item.startDate),
          endDate: item.endDate ? new Date(item.endDate) : undefined,
        })),
      ),
    };

    const res = id ? await updateMutate(formData) : await createMutate(formData);

    if (res.ok) {
      router.push('/admin/banners');
      toast.success(`배너가 ${id ? '수정' : '생성'}되었습니다.`);
    }
    setIsPending(false);
  };

  return { handleSubmit, isPending };
}
