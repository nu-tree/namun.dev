import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { PopupFormSchema } from '@/components/pages/dashboard/popups/form/popup-form-schema';

export function usePopupCreate() {
  return useMutation({
    mutationFn: async (data: PopupFormSchema) => {
      return await fetchPost('/api/popup/create', data);
    },
  });
}
