import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { UpdateCommentSchema } from '@/lib/hono/api/service/comment/schema/create-comment.schema';

export function useCommentUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: UpdateCommentSchema) => {
      return await fetchPut(`/api/comment/update/${id}`, data);
    },
  });
}
