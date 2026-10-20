'use client';

import { useMutation } from '@tanstack/react-query';
import { fetchDelete, fetchPost } from '@/lib/utils/fetch-client';

/** 조직 멤버 단건 제거 */
export const useOrganizationMemberRemove = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetchDelete(`/api/organization/member/remove/${id}`);

      if (!res.ok) {
        throw new Error(res.error?.message || '조직 멤버 제거에 실패했습니다.');
      }

      return res.data;
    },
  });
};

/** 조직 멤버 여러건 제거 */
export const useOrganizationMembersRemove = () => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await fetchPost('/api/organization/member/remove', { ids });

      if (!res.ok) {
        throw new Error(res.error?.message || '조직 멤버 제거에 실패했습니다.');
      }

      return res.data;
    },
  });
};
