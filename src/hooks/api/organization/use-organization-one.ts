'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { GetOrganizationResponseSchema } from '@/lib/hono/api/service/organization/schema/get-organization.schema';

/** ID로 조직 단건 조회 */
export const getOrganizationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['organization', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<GetOrganizationResponseSchema>(`/api/organization/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '조직을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });

export const useOrganizationOne = (id: string) => {
  return useQuery(getOrganizationQueryOptions(id));
};
