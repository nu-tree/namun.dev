import { useToast } from '@/hooks/custom/use-toast';
import {
  MyInfoFormSchema,
  MyPasswordFormSchema,
} from '@/components/pages/platform/sub-page/my-page/my-info-form-schema';
import { useUserUpdate } from '@/hooks/api/user/use-user-update';
import { useChangePassword } from '@/hooks/auth/platform/use-change-password';

export default function useMyPageFormSubmit(id?: string) {
  const toast = useToast();
  const { mutateAsync: passwordUpdateMutate, isPending: isPasswordPending } = useChangePassword();
  const { mutateAsync, isPending } = useUserUpdate(id || '');

  const onMyPageSubmit = async (data: MyInfoFormSchema) => {
    if (!id) {
      return toast.error('사용자를 찾을 수 없습니다..');
    }
    const res = await mutateAsync({
      ...data,
      email: '',
      emailVerified: false,
      role: 'user',
    });

    if (res.ok) {
      toast.success('수정 완료');
    } else {
      toast.error('에러 발생: ' + res.error.message);
    }
  };

  return { onMyPageSubmit, onPasswordSubmit: passwordUpdateMutate, isPending, isPasswordPending };
}
