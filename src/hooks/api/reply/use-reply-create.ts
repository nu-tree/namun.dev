import { ReplyFormSchema } from '@/components/pages/dashboard/inquiry/forms/reply-form-schema';
import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function useReplyCreate() {
  return useMutation({
    mutationFn: async (data: ReplyFormSchema) => {
      return await fetchPost('/api/reply/create', data);
    },
  });
}
