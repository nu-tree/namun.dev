import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { PostFormSchema } from '@/components/pages/dashboard/posts/form/post-form-schema';

export function usePostCreate() {
  return useMutation({
    mutationFn: async (data: PostFormSchema) => {
      return await fetchPost('/api/post/create', data);
    },
  });
}
