import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { ReplyFormSchema } from '@/components/pages/dashboard/inquiry/forms/reply-form-schema';

export function useReplyUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: ReplyFormSchema) => {
      return await fetchPut(`/api/reply/update/${id}`, data);
    },
  });
}
