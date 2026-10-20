'use client';

import { useMutation } from '@tanstack/react-query';
import { fetchPut } from '@/lib/utils/fetch-client';
import { UpdateOrganizationSchema } from '@/lib/hono/api/service/organization/schema/create-organization.schema';

/** 조직 수정 */
export const useOrganizationUpdate = (id: string) => {
  return useMutation({
    mutationFn: async (data: UpdateOrganizationSchema) => {
      return await fetchPut(`/api/organization/update/${id}`, data);
    },
  });
};
