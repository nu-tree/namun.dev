'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { UserSchema } from '@/lib/hono/api/service/user/schema/user.schema';

/** ID로 단건 조회 */
export const getUserOneQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['user-one', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<UserSchema>(`/api/user/admin/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '게시물을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });

export const useUserOne = (id: string) => {
  return useQuery(getUserOneQueryOptions(id));
};
