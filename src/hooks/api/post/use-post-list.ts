'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetPostListRequestSchema,
  GetPostListResponseSchema,
} from '@/lib/hono/api/service/post/schema/get-post.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';
import { useQueryState } from 'nuqs';

/** 관리자페이지 목록조회 */
export const getPostListQueryOptions = (params: GetPostListRequestSchema) =>
  queryOptions({
    queryKey: ['post-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetPostListResponseSchema>('/api/post', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '게시물 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const usePostList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const {
    keywordOptions: { keyword, keywordName },
  } = useKeywordSearchState();
  const { limit, offset } = pageToLimitOffset(pagination);
  const [boardSlug] = useQueryState('boardSlug');

  return useQuery(
    getPostListQueryOptions({
      limit,
      offset,
      keyword: keyword || '',
      keywordName: keywordName || '',
      boardSlug: boardSlug || '',
    }),
  );
};
