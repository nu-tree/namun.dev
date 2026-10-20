'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { TopUserDeviceSchema } from '@/lib/hono/api/service/metrics/schema/metrics.schema';
import { z } from 'zod';

export const getTopUserDeviceQueryOptions = () =>
  queryOptions({
    queryKey: ['metrics', 'top-user-device'] as const,
    queryFn: async () => {
      const res = await fetchGet<z.infer<typeof TopUserDeviceSchema>[]>('/api/metrics/top-user-device');

      if (!res.ok) {
        throw new Error(res.error?.message || '디바이스별 사용자 데이터를 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useTopUserDevice = () => {
  return useQuery(getTopUserDeviceQueryOptions());
};
