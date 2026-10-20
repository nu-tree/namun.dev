import { UpdateSiteSettingSchema } from '@/lib/hono/api/service/site-setting/schema/update-site-setting.schema';
import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function useSiteSettingUpdate() {
  return useMutation({
    mutationFn: async (data: UpdateSiteSettingSchema) => {
      return await fetchPut(`/api/site-setting`, data);
    },
  });
}
