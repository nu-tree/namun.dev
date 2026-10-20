'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { GetSiteSettingListSchema } from '@/lib/hono/api/service/site-setting/schema/get-site-setting.schema';

/** 관리자페이지 목록조회 */
export const getSiteSettingListQueryOptions = () =>
  queryOptions({
    queryKey: ['siteSetting-list'],
    queryFn: async () => {
      const res = await fetchGet<GetSiteSettingListSchema>('/api/site-setting');

      if (!res.ok) {
        throw new Error(res.error?.message || '사이트 설정 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useSiteSettingList = () => {
  return useQuery(getSiteSettingListQueryOptions());
};
