'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { GetInquiryResponseSchema } from '@/lib/hono/api/service/inquiry/schema/get-inquiry.schema';

/** 문의 단건 조회 */
export const getInquiryOneQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['inquiry-one', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<GetInquiryResponseSchema>(`/api/inquiry/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '문의를 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });
export const useInquiryOne = (id: string) => {
  return useQuery(getInquiryOneQueryOptions(id));
};
