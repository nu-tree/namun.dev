'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { GetReplyResponseSchema } from '@/lib/hono/api/service/reply/schema/get-reply.schema';

/** 문의 ID로 답변 단건 조회 */
export const getReplyOneByInquiryIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['reply-one', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<GetReplyResponseSchema>(`/api/reply/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '문의 답변을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });
export const useReplyOneByInquiryId = (id: string) => {
  return useQuery(getReplyOneByInquiryIdQueryOptions(id));
};
