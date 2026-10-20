'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/custom/use-toast';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { OrganizationSchema } from '@/lib/hono/api/service/organization/schema/organization.schema';
import { useOrganizationsDelete } from '@/hooks/api/organization/use-organization-delete';
import { useOrganizationList } from '@/hooks/api/organization/use-organization-list';

export default function OrganizationColumnsHeader({ table }: { table: Table<OrganizationSchema> }) {
  const { success, error } = useToast();
  const { mutateAsync: deleteOrganizationMany } = useOrganizationsDelete();
  const { refetch } = useOrganizationList();
  const handleClickDelete = async () => {
    if (!(await asyncConfirm('정말 삭제하시겠습니까?'))) return;
    const selectedRows = table?.getSelectedRowModel().rows;
    const selectedData = selectedRows?.map((row) => row.original);
    const result = await deleteOrganizationMany(selectedData.map(({ id }) => id));
    if (!result.ok) {
      error(result.error.message);
    } else {
      success('삭제되었습니다.');
      refetch();
    }
  };

  return (
    <Button variant="ghost" onClick={handleClickDelete} className="text-destructive hover:text-destructive">
      <Trash2 />
      선택 삭제
    </Button>
  );
}
