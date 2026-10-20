'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetBannerListRequestSchema,
  GetBannerListResponseSchema,
} from '@/lib/hono/api/service/banner/schema/get-banner.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';
import { parseAsBoolean, useQueryState } from 'nuqs';

/** 관리자페이지 목록조회 */
export const getBannerListQueryOptions = (params: GetBannerListRequestSchema) =>
  queryOptions({
    queryKey: ['banner-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetBannerListResponseSchema>('/api/banner', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '배너 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useBannerList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const {
    keywordOptions: { keyword, keywordName },
  } = useKeywordSearchState();
  const [isView] = useQueryState('isView', parseAsBoolean);
  const { limit, offset } = pageToLimitOffset(pagination);

  return useQuery(
    getBannerListQueryOptions({
      limit,
      offset,
      keyword: keyword || '',
      keywordName: keywordName || '',
      isView: isView || undefined,
    }),
  );
};
