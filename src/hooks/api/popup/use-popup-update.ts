import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { PopupFormSchema } from '@/components/pages/dashboard/popups/form/popup-form-schema';

export function usePopupUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: PopupFormSchema) => {
      return await fetchPut(`/api/popup/update/${id}`, data);
    },
  });
}
