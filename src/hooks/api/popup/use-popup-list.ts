'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetPopupListRequestSchema,
  GetPopupListResponseSchema,
} from '@/lib/hono/api/service/popup/schema/get-popup.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';

/** 관리자페이지 목록조회 */
export const getPopupListQueryOptions = (params: GetPopupListRequestSchema) =>
  queryOptions({
    queryKey: ['popup-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetPopupListResponseSchema>('/api/popup/admin', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '팝업 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const usePopupList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const {
    keywordOptions: { keyword, keywordName },
  } = useKeywordSearchState();
  const { limit, offset } = pageToLimitOffset(pagination);

  return useQuery(
    getPopupListQueryOptions({
      limit,
      offset,
      keyword: keyword || '',
      keywordName: keywordName || '',
    }),
  );
};
