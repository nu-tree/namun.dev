'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { GetBoardSlugListResponseSchema } from '@/lib/hono/api/service/board/schema/get-board.schema';

export const getBoardSlugListQueryOptions = () =>
  queryOptions({
    queryKey: ['board-slug-list'] as const,
    queryFn: async () => {
      const res = await fetchGet<GetBoardSlugListResponseSchema>('/api/board/slugs');

      if (!res.ok) {
        throw new Error(res.error?.message || '게시판 슬러그 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useBoardSlugList = () => {
  return useQuery(getBoardSlugListQueryOptions());
};
