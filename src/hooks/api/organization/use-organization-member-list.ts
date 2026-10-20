'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetOrganizationMembersRequestSchema,
  GetOrganizationMembersResponseSchema,
} from '@/lib/hono/api/service/organization/schema/get-organization.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';

/** 조직 멤버 목록 조회 */
export const getOrganizationMembersQueryOptions = (params: GetOrganizationMembersRequestSchema) =>
  queryOptions({
    queryKey: ['organization-members', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetOrganizationMembersResponseSchema>('/api/organization/members', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '조직 멤버 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useOrganizationMemberList = (organizationId: string) => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const { limit, offset } = pageToLimitOffset(pagination);

  return useQuery(
    getOrganizationMembersQueryOptions({
      limit,
      offset,
      organizationId,
    }),
  );
};
