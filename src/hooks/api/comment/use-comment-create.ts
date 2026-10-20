import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { CreateCommentSchema } from '@/lib/hono/api/service/comment/schema/create-comment.schema';

export function useCommentCreate() {
  return useMutation({
    mutationFn: async (data: CreateCommentSchema) => {
      return await fetchPost('/api/comment/create', data);
    },
  });
}
