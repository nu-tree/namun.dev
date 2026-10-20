'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { InquirySchema } from '@/lib/hono/api/service/inquiry/schema/inquiry.schema';
import { useInquiryDelete } from '@/hooks/api/inquiry/use-inquiry-delete';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { useInquiryList } from '@/hooks/api/inquiry/use-inquiry-list';
import { useToast } from '@/hooks/custom/use-toast';
import { Table } from '@tanstack/react-table';

export default function InquiryColumnsDeleteHeader({ table }: { table: Table<InquirySchema> }) {
  const toast = useToast();
  const { refetch } = useInquiryList();
  const { mutateAsync } = useInquiryDelete();

  const handleClickDelete = async () => {
    if (!(await asyncConfirm('정말 삭제하시겠습니까?'))) return;

    const selectedRows = table.getSelectedRowModel().rows;
    const selectedData = selectedRows.map((row) => row.original);
    const result = await mutateAsync({ ids: selectedData.map(({ id }) => id) });

    if (!result.ok) {
      toast.error('에러 발생: ' + result.error.message);
    } else {
      toast.success('삭제되었습니다.');
      table.resetRowSelection();
      refetch();
    }
  };

  return (
    <Button variant="ghost" onClick={handleClickDelete} className="text-destructive mx-auto">
      <Trash2 />
      선택 삭제
    </Button>
  );
}
