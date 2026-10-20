import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';
import { BoardFormSchema } from '@/components/pages/dashboard/boards/form/board-form-schema';

export function useBoardUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: BoardFormSchema) => {
      return await fetchPut(`/api/board/update/${id}`, data);
    },
  });
}
