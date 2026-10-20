'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetOrganizationsRequestSchema,
  GetOrganizationsResponseSchema,
} from '@/lib/hono/api/service/organization/schema/get-organization.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';

/** 조직 목록 조회 */
export const getOrganizationListQueryOptions = (params: GetOrganizationsRequestSchema) =>
  queryOptions({
    queryKey: ['organization-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetOrganizationsResponseSchema>('/api/organization', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '조직 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useOrganizationList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const {
    keywordOptions: { keyword, keywordName },
  } = useKeywordSearchState();
  const { limit, offset } = pageToLimitOffset(pagination);

  return useQuery(
    getOrganizationListQueryOptions({
      limit,
      offset,
      keyword: keyword || '',
      keywordName: keywordName || '',
    }),
  );
};
