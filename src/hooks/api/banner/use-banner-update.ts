import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { BannerFormSchema } from '@/components/pages/dashboard/banners/form/banner-form-schema';

export function useBannerUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: BannerFormSchema) => {
      return await fetchPut(`/api/banner/update/${id}`, data);
    },
  });
}
