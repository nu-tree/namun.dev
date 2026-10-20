'use client';

import { useMutation } from '@tanstack/react-query';
import { fetchPost } from '@/lib/utils/fetch-client';
import { AddOrganizationMemberSchema } from '@/lib/hono/api/service/organization/schema/create-organization.schema';

/** 조직에 멤버 추가 */
export const useOrganizationMemberAdd = () => {
  return useMutation({
    mutationFn: async (data: AddOrganizationMemberSchema) => {
      const res = await fetchPost('/api/organization/member/add', data);

      if (!res.ok) {
        throw new Error(res.error?.message || '조직 멤버 추가에 실패했습니다.');
      }

      return res.data;
    },
  });
};
