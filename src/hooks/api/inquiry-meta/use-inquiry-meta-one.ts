'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { InquiryMetaSchema } from '@/lib/hono/api/service/inquiry-meta/schema/inquiry-meta.schema';

/** ID로 조회(관리자페이지 수정용) */
export const getInquiryMetaOneQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['inquiry-meta-one', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<InquiryMetaSchema>(`/api/inquiry-meta/id/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '게시판을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });
export const useInquiryMetaOne = (id: string) => {
  return useQuery(getInquiryMetaOneQueryOptions(id));
};

/** 게시판 SLUG로 조회(사용자페이지 노출용) */
export const getInquiryMetaOneBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['inquiry-meta-one-slug', slug] as const,
    queryFn: async ({ queryKey }) => {
      const [, slug] = queryKey;

      const res = await fetchGet<InquiryMetaSchema>(`/api/inquiry-meta/slug/${slug} `);

      if (!res.ok) {
        throw new Error(res.error?.message || '게시판을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });
export const useInquiryMetaOneBySlug = (slug: string) => {
  return useQuery(getInquiryMetaOneBySlugQueryOptions(slug));
};
