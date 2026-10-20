'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { useToast } from '@/hooks/custom/use-toast';
import { PopupSchema } from '@/lib/hono/api/service/popup/schema/popup-schema';
import { usePopupDelete } from '@/hooks/api/popup/use-popup-delete';
import { usePopupList } from '@/hooks/api/popup/use-popup-list';

export default function PopupsColumnsHeader({ table }: { table: Table<PopupSchema> }) {
  const toast = useToast();
  const { refetch } = usePopupList();
  const { mutateAsync, isPending } = usePopupDelete();

  const handleClickDelete = async () => {
    if (!(await asyncConfirm('정말 삭제하시겠습니까?'))) return;

    const selectedRows = table.getSelectedRowModel().rows;
    const selectedData = selectedRows.map((row) => row.original);
    const result = await mutateAsync({ ids: selectedData.map(({ id }) => id) });

    if (!result.ok) {
      toast.error(result.error.message);
    } else {
      toast.success('삭제되었습니다.');
      table.resetRowSelection();
      refetch();
    }
  };

  return (
    <Button
      onClick={handleClickDelete}
      variant="ghost"
      className="text-destructive hover:text-destructive ml-auto cursor-pointer"
    >
      <Trash2 />
      {isPending ? '삭제 중' : '선택 삭제'}
    </Button>
  );
}
