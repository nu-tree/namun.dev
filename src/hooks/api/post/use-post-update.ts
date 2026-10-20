import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { PostFormSchema } from '@/components/pages/dashboard/posts/form/post-form-schema';

export function usePostUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: PostFormSchema) => {
      return await fetchPut(`/api/post/update/${id}`, data);
    },
  });
}
