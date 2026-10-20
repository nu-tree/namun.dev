import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/custom/use-toast';
import { BoardFormSchema } from '@/components/pages/dashboard/boards/form/board-form-schema';
import { useBoardCreate } from '@/hooks/api/board/use-board-create';
import { useBoardUpdate } from '@/hooks/api/board/use-board-update';

export function useBoardFormSubmit(id?: string) {
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: createMutate, isPending: isCreating } = useBoardCreate();
  const { mutateAsync: updateMutate, isPending: isUpdating } = useBoardUpdate(id || '');

  const handleSubmit = async (data: BoardFormSchema) => {
    const res = id ? await updateMutate(data) : await createMutate(data);

    if (res.ok) {
      router.push('/admin/boards');
      toast.success(`게시판이 ${id ? '수정' : '생성'}되었습니다.`);
    }
  };

  return { handleSubmit, isPending: isCreating || isUpdating };
}
