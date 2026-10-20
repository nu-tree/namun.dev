'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { BoardSchema } from '@/lib/hono/api/service/board/schema/board.schema';

/** 게시판 ID로 조회(관리자페이지 수정용) */
export const getBoardOneQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['board-one', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<BoardSchema>(`/api/board/id/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '게시판을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });
export const useBoardOne = (id: string) => {
  return useQuery(getBoardOneQueryOptions(id));
};

/** 게시판 SLUG로 조회(사용자페이지 노출용) */
export const getBoardOneBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['board-one-slug', slug] as const,
    queryFn: async ({ queryKey }) => {
      const [, slug] = queryKey;

      const res = await fetchGet<BoardSchema>(`/api/board/slug/${slug} `);

      if (!res.ok) {
        throw new Error(res.error?.message || '게시판을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });
export const useGetBoardOneBySlug = (slug: string) => {
  return useQuery(getBoardOneBySlugQueryOptions(slug));
};
