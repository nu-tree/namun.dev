'use client';

import { Button } from '@/components/ui/button';
import { UserX } from 'lucide-react';
import { useToast } from '@/hooks/custom/use-toast';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { useParams } from 'next/navigation';
import { useUserDelete } from '@/hooks/api/user/use-user-delete';
import { useOrganizationMemberList } from '@/hooks/api/organization/use-organization-member-list';
import { MemberResponseSchema } from '@/lib/hono/api/service/organization/schema/get-organization.schema';
import { Row } from '@tanstack/react-table';

export default function OrganizationMembersColumnsCell({ row }: { row: Row<MemberResponseSchema> }) {
  const toast = useToast();
  const { id: organizationId } = useParams<{ id: string }>();
  const { mutateAsync: removeMember } = useUserDelete();
  const { refetch } = useOrganizationMemberList(organizationId);
  const handleRemoveMember = async () => {
    if (!(await asyncConfirm('정말 이 멤버를 제거하시겠습니까?'))) return;
    if (row.original.role === 'owner' || row.original.role === 'admin') {
      toast.error('오너 또는 관리자는 제거할 수 없습니다.');
      return;
    }
    const result = await removeMember({ ids: [row.original.id] });
    if (!result.ok) {
      toast.error(result.error.message);
      return;
    }
    toast.success('멤버가 제거되었습니다.');
    refetch();
  };

  return (
    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={handleRemoveMember}>
      <UserX />
      멤버 제거
    </Button>
  );
}
