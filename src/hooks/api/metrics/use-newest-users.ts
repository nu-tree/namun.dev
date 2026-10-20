'use client';

import { useQuery, queryOptions } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import { NewestUserSchema } from '@/lib/hono/api/service/metrics/schema/metrics.schema';
import { z } from 'zod';

export const getNewestUsersQueryOptions = () =>
  queryOptions({
    queryKey: ['metrics', 'newest-users'] as const,
    queryFn: async () => {
      const res = await fetchGet<NewestUserSchema[]>('/api/metrics/newest-users');

      if (!res.ok) {
        throw new Error(res.error?.message || '최근 가입 사용자 데이터를 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useNewestUsers = () => {
  return useQuery(getNewestUsersQueryOptions());
};
