import { IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function usePostDelete() {
  return useMutation({
    mutationFn: async (data: IdsQuerySchema) => {
      return await fetchPost('/api/post/delete', data);
    },
  });
}
