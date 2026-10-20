'use client';

import { useQuery, queryOptions, useMutation } from '@tanstack/react-query';
import { fetchGet } from '@/lib/utils/fetch-client';
import {
  GetUserListRequestSchema,
  GetUserListResponseSchema,
} from '@/lib/hono/api/service/user/schema/get-user.schema';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { USER_ROLE_VALUES } from '@/lib/constants/user-role-constants';
import { exportToExcel } from '@/lib/utils/export-to-excel';
import { format } from 'path';
import { formatDate } from 'date-fns';

/** 관리자페이지 목록조회 */
export const getUserListQueryOptions = (params: GetUserListRequestSchema) =>
  queryOptions({
    queryKey: ['user-list', params] as const,
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;

      const res = await fetchGet<GetUserListResponseSchema>('/api/user', { params });

      if (!res.ok) {
        throw new Error(res.error?.message || '사용자 목록을 불러오는데 실패했습니다.');
      }

      return res.data;
    },
  });

export const useUserList = () => {
  const { pagination, pageToLimitOffset } = usePaginationQueryState();
  const {
    keywordOptions: { keyword, keywordName },
  } = useKeywordSearchState();
  const [userRole] = useQueryState('userRole', parseAsStringEnum(USER_ROLE_VALUES));
  const { limit, offset } = pageToLimitOffset(pagination);

  return useQuery(
    getUserListQueryOptions({
      limit,
      offset,
      keyword: keyword || '',
      keywordName: keywordName || '',
      userRole: userRole || undefined,
    }),
  );
};

/** 관리자페이지 엑셀 다운로드를 위해 모든 페이지 유저 조회 */
export const useUserListForExcel = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetchGet<GetUserListResponseSchema>('/api/user', {
        params: { limit: 10000, offset: 0 },
      });

      if (!res.ok) {
        throw new Error(res.error?.message || '엑셀 다운로드를 실패했습니다.');
      }

      return res.data;
    },
    onSuccess: (data) => {
      const today = formatDate(new Date(), 'yyyyMMdd_HHmmss');
      const exportData = data.data.map(({ name, email, phoneNumber }) => ({
        이름: name,
        이메일: email,
        전화번호: phoneNumber,
      }));
      exportToExcel(exportData, `user_list_${today}.xlsx`);
    },
  });
};
