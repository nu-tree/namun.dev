import { IdsQuerySchema } from '@/lib/hono/api/shared/schema';
import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function useInquiryMetaDelete() {
  return useMutation({
    mutationFn: async (data: IdsQuerySchema) => {
      return await fetchPost('/api/inquiry-meta/delete', data);
    },
  });
}
