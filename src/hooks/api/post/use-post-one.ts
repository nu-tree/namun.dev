'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { PostSchema } from '@/lib/hono/api/service/post/schema/post.schema';

/** ID로 단건 조회 */
export const getPostOneQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['post-one', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<PostSchema>(`/api/post/id/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '게시물을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });

export const usePostOne = (id: string) => {
  return useQuery(getPostOneQueryOptions(id));
};
