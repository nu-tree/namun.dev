'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { DailyNewUserSchema } from '@/lib/hono/api/service/metrics/schema/metrics.schema';
import { z } from 'zod';

export const getDailyNewUserQueryOptions = () =>
  queryOptions({
    queryKey: ['metrics', 'daily-new-user'] as const,
    queryFn: async () => {
      const res = await fetchGet<z.infer<typeof DailyNewUserSchema>[]>('/api/metrics/daily-new-user');

      if (!res.ok) {
        throw new Error(res.error?.message || '일일 신규 가입자 데이터를 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useDailyNewUser = () => {
  return useQuery(getDailyNewUserQueryOptions());
};
