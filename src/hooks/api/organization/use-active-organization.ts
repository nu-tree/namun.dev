'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { GetActiveOrganizationResponseSchema } from '@/lib/hono/api/service/organization/schema/get-organization.schema';

/** 사용자의 활성 조직 조회 */
export const getActiveOrganizationQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['active-organization', userId] as const,
    queryFn: async ({ queryKey }) => {
      const [, userId] = queryKey;

      const res = await fetchGet<GetActiveOrganizationResponseSchema>(`/api/organization/active/${userId}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '활성 조직을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!userId,
  });

export const useActiveOrganization = (userId: string) => {
  return useQuery(getActiveOrganizationQueryOptions(userId));
};
