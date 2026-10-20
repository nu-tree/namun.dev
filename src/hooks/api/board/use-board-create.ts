import { fetchPost } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { BoardFormSchema } from '@/components/pages/dashboard/boards/form/board-form-schema';

export function useBoardCreate() {
  return useMutation({
    mutationFn: async (data: BoardFormSchema) => {
      return await fetchPost('/api/board/create', data);
    },
  });
}
