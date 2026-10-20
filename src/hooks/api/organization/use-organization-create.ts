'use client';

import { useMutation } from '@tanstack/react-query';
import { fetchPost } from '@/lib/utils/fetch-client';
import { CreateOrganizationSchema } from '@/lib/hono/api/service/organization/schema/create-organization.schema';

/** 조직 생성 */
export const useOrganizationCreate = () => {
  return useMutation({
    mutationFn: async (data: CreateOrganizationSchema) => {
      return await fetchPost('/api/organization/create', data);
    },
  });
};
