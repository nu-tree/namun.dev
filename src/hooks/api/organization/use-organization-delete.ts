'use client';

import { useMutation } from '@tanstack/react-query';
import { fetchDelete, fetchPost } from '@/lib/utils/fetch-client';

/** 조직 단건 삭제 */
export const useOrganizationDelete = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await fetchDelete(`/api/organization/delete/${id}`);
    },
  });
};

/** 조직 여러건 삭제 */
export const useOrganizationsDelete = () => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      return await fetchPost('/api/organization/delete', { ids });
    },
  });
};
