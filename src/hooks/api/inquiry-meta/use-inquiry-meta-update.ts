import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { InquiryMetaFormSchema } from '@/components/pages/dashboard/inquiry-meta/form/inquiry-meta-form.schema';

export function useInquiryMetaUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: InquiryMetaFormSchema) => {
      return await fetchPut(`/api/inquiry-meta/update/${id}`, data);
    },
  });
}
