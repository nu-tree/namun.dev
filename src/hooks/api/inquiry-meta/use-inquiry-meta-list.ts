'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetInquiryMetaListRequestSchema,
  GetInquiryMetaListResponseSchema,
} from '@/lib/hono/api/service/inquiry-meta/schema/get-inquiry-meta.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';

/** 관리자페이지 목록조회 */
export const getInquiryMetaListQueryOptions = (params: GetInquiryMetaListRequestSchema) =>
  queryOptions({
    queryKey: ['inquiry-meta-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetInquiryMetaListResponseSchema>('/api/inquiry-meta', { params });
      if (!res.ok) {
        throw new Error(res.error?.message || '게시판 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useInquiryMetaList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const {
    keywordOptions: { keyword, keywordName },
  } = useKeywordSearchState();
  const { limit, offset } = pageToLimitOffset(pagination);

  return useQuery(
    getInquiryMetaListQueryOptions({
      limit,
      offset,
      keyword: keyword || '',
      keywordName: keywordName || '',
    }),
  );
};
