import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/custom/use-toast';
import { PostFormSchema } from '@/components/pages/dashboard/posts/form/post-form-schema';
import { usePostCreate } from '@/hooks/api/post/use-post-create';
import { usePostUpdate } from '@/hooks/api/post/use-post-update';
import { uploadS3Files, uploadFileOne } from '@/lib/s3-service/s3-uploader';
import { usePostOne } from './use-post-one';
import { usePostList } from './use-post-list';

/** 관리자페이지용 게시글 생성/수정 훅 */
export function usePostFormSubmit(id?: string) {
  const router = useRouter();
  const toast = useToast();
  const { refetch } = usePostOne(id || '');
  const { refetch: refetchList } = usePostList();
  const { mutateAsync: createMutate, isPending: isCreating } = usePostCreate();
  const { mutateAsync: updateMutate, isPending: isUpdating } = usePostUpdate(id || '');

  const handleSubmit = async (data: PostFormSchema) => {
    const thumbnail = await uploadFileOne(data.thumbnail);
    const attachments = await uploadS3Files(data.attachments);

    const submitData = {
      ...data,
      thumbnail,
      attachments,
    };

    const res = id ? await updateMutate(submitData) : await createMutate(submitData);

    if (res.ok) {
      if (id) {
        refetch();
      }
      refetchList();
      router.push('/admin/posts');
      toast.success(`게시물이 ${id ? '수정' : '생성'}되었습니다.`);
    }
  };

  return { handleSubmit, isPending: isCreating || isUpdating };
}
