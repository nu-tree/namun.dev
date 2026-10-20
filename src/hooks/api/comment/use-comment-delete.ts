import { IdParamSchema } from '@/lib/hono/api/shared/schema';
import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function useCommentDelete() {
  return useMutation({
    mutationFn: async ({ id }: IdParamSchema) => {
      return await fetchPost(`/api/comment/delete/${id}`);
    },
  });
}
