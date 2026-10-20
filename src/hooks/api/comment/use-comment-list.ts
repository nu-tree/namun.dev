'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import {
  GetCommentsRequestSchema,
  GetCommentsResponseSchema,
} from '@/lib/hono/api/service/comment/schema/get-comment.schema';

/** 목록조회 */
export const getCommentListQueryOptions = (params: GetCommentsRequestSchema) =>
  queryOptions({
    queryKey: ['comment-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetCommentsResponseSchema>('/api/comment', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '댓글 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useCommentList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const { limit, offset } = pageToLimitOffset(pagination);

  return useQuery(
    getCommentListQueryOptions({
      limit,
      offset,
    }),
  );
};
