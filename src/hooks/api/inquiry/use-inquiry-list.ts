'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetInquiriesRequestSchema,
  GetInquiriesResponseSchema,
} from '@/lib/hono/api/service/inquiry/schema/get-inquiry.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';
import { parseAsBoolean, useQueryState } from 'nuqs';

/** 목록조회 */
export const getInquiryListQueryOptions = (params: GetInquiriesRequestSchema) =>
  queryOptions({
    queryKey: ['inquiry-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetInquiriesResponseSchema>('/api/inquiry', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '문의 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useInquiryList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const {
    keywordOptions: { keyword, keywordName },
  } = useKeywordSearchState();
  const { limit, offset } = pageToLimitOffset(pagination);
  const [isAnswered] = useQueryState('isAnswered', parseAsBoolean);

  return useQuery(
    getInquiryListQueryOptions({
      isAnswered,
      limit,
      offset,
      keyword: keyword || '',
      keywordName: keywordName || '',
    }),
  );
};
