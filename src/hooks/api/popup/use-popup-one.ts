'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { PopupSchema } from '@/lib/hono/api/service/popup/schema/popup-schema';

/** 팝업 ID로 조회(관리자페이지 수정용) */
export const getPopupOneQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['popup-one', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<PopupSchema>(`/api/popup/admin/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '배너를 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });
export const usePopupOne = (id: string) => {
  return useQuery(getPopupOneQueryOptions(id));
};
