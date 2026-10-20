'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { BannerSchema } from '@/lib/hono/api/service/banner/schema/banner.schema';

/** 배너 ID로 조회(관리자페이지 수정용) */
export const getBannerOneQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['banner-one', id] as const,
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;

      const res = await fetchGet<BannerSchema>(`/api/banner/id/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '배너를 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!id,
  });
export const useBannerOne = (id: string) => {
  return useQuery(getBannerOneQueryOptions(id));
};

/** 배너 SLUG로 조회(사용자페이지 노출용) */
export const getBannerOneBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['banner-one-slug', slug] as const,
    queryFn: async ({ queryKey }) => {
      const [, slug] = queryKey;

      const res = await fetchGet<BannerSchema>(`/api/banner/slug/${slug} `);

      if (!res.ok) {
        throw new Error(res.error?.message || '배너를 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });
export const useGetBannerOneBySlug = (slug: string) => {
  return useQuery(getBannerOneBySlugQueryOptions(slug));
};
