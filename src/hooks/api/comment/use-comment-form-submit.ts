import { useToast } from '@/hooks/custom/use-toast';
import { useCommentCreate } from './use-comment-create';
import { useCommentUpdate } from './use-comment-update';
import { UpdateCommentSchema } from '@/lib/hono/api/service/comment/schema/create-comment.schema';

export function useCommentFormSubmit(id?: string) {
  const toast = useToast();
  const { mutateAsync: createMutate, isPending: isCreating } = useCommentCreate();
  const { mutateAsync: updateMutate, isPending: isUpdating } = useCommentUpdate(id || '');

  const handleSubmit = async (data: UpdateCommentSchema) => {
    const res = id ? await updateMutate(data) : await createMutate(data);

    if (res.ok) {
      toast.success(`댓글이 ${id ? '수정' : '생성'}되었습니다.`);
    }
  };

  return { handleSubmit, isPending: isCreating || isUpdating };
}
