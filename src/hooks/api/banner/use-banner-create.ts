import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { BannerFormSchema } from '@/components/pages/dashboard/banners/form/banner-form-schema';

export function useBannerCreate() {
  return useMutation({
    mutationFn: async (data: BannerFormSchema) => {
      return await fetchPost('/api/banner/create', data);
    },
  });
}
