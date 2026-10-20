import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { InquiryMetaFormSchema } from '@/components/pages/dashboard/inquiry-meta/form/inquiry-meta-form.schema';

export function useInquiryMetaCreate() {
  return useMutation({
    mutationFn: async (data: InquiryMetaFormSchema) => {
      return await fetchPost('/api/inquiry-meta/create', data);
    },
  });
}
