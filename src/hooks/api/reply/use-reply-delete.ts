import { IdParamSchema } from '@/lib/hono/api/shared/schema';
import { fetchDelete } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function useReplyDelete() {
  return useMutation({
    mutationFn: async ({ id }: IdParamSchema) => {
      return await fetchDelete(`/api/reply/${id}`);
    },
  });
}
