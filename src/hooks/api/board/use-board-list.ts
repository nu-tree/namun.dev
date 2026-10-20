'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetBoardListRequestSchema,
  GetBoardListResponseSchema,
} from '@/lib/hono/api/service/board/schema/get-board.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';

/** 관리자페이지 목록조회 */
export const getBoardListQueryOptions = (params: GetBoardListRequestSchema) =>
  queryOptions({
    queryKey: ['board-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetBoardListResponseSchema>('/api/board', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '게시판 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useBoardList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const {
    keywordOptions: { keyword, keywordName },
  } = useKeywordSearchState();
  const { limit, offset } = pageToLimitOffset(pagination);

  return useQuery(
    getBoardListQueryOptions({
      limit,
      offset,
      keyword: keyword || '',
      keywordName: keywordName || '',
    }),
  );
};
