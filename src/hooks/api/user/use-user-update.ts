import { UsersFormSchema } from '@/components/pages/dashboard/users/forms/user-form-schema';
import { fetchPut } from '@/lib/utils/fetch-client';
import { useMutation } from '@tanstack/react-query';

export function useUserUpdate(id: string) {
  return useMutation({
    mutationFn: async (data: UsersFormSchema) => {
      return await fetchPut(`/api/user/${id}`, data);
    },
  });
}
