import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/custom/use-toast';
import { useOrganizationCreate } from '@/hooks/api/organization/use-organization-create';
import { useOrganizationUpdate } from '@/hooks/api/organization/use-organization-update';
import { OrganizationFormSchema } from '@/components/pages/dashboard/organizations/form/organization-form-schema';

export function useOrganizationFormSubmit(id?: string) {
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: createMutate, isPending: isCreating } = useOrganizationCreate();
  const { mutateAsync: updateMutate, isPending: isUpdating } = useOrganizationUpdate(id || '');

  const handleSubmit = async (data: OrganizationFormSchema) => {
    const res = id ? await updateMutate(data) : await createMutate(data);

    if (res.ok) {
      router.push('/admin/organizations');
      toast.success(`조직이 ${id ? '수정' : '생성'}되었습니다.`);
    }
  };

  return { handleSubmit, isPending: isCreating || isUpdating };
}
