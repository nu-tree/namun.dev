import { InquiryFormSchema } from '@/components/pages/platform/sub-page/inquiry/inquiry-form-schema';
import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function useInquiryUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: InquiryFormSchema) => {
      return await fetchPut(`/api/inquiry/update/${id}`, data);
    },
  });
}
