'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { SiteSettingSchema, SiteSettingKeyType } from '@/lib/hono/api/service/site-setting/schema/site-setting.schema';

/** key로 단건 조회 */
export const getSiteSettingOneQueryOptions = (key: SiteSettingKeyType) =>
  queryOptions({
    queryKey: ['site-setting-one', key] as const,
    queryFn: async ({ queryKey }) => {
      const [, key] = queryKey;

      const res = await fetchGet<SiteSettingSchema>(`/api/site-setting/${key}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '게시물을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
    enabled: !!key,
  });

export const useSiteSettingOne = (key: SiteSettingKeyType) => {
  return useQuery(getSiteSettingOneQueryOptions(key));
};
