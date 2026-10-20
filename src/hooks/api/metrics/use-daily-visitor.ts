'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { DailyVisitorSchema } from '@/lib/hono/api/service/metrics/schema/metrics.schema';
import { z } from 'zod';

export const getDailyVisitorQueryOptions = () =>
  queryOptions({
    queryKey: ['metrics', 'daily-visitor'] as const,
    queryFn: async () => {
      const res = await fetchGet<z.infer<typeof DailyVisitorSchema>[]>('/api/metrics/daily-visitor');

      if (!res.ok) {
        throw new Error(res.error?.message || '일일 방문자 데이터를 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useDailyVisitor = () => {
  return useQuery(getDailyVisitorQueryOptions());
};
