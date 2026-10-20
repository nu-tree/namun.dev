import { InquiryFormSchema } from '@/components/pages/platform/sub-page/inquiry/inquiry-form-schema';
import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function useInquiryCreate() {
  return useMutation({
    mutationFn: async (data: InquiryFormSchema) => {
      return await fetchPost('/api/inquiry/create', data);
    },
  });
}
