'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { useToast } from '@/hooks/custom/use-toast';
import { InquiryMetaSchema } from '@/lib/hono/api/service/inquiry-meta/schema/inquiry-meta.schema';
import { useInquiryMetaDelete } from '@/hooks/api/inquiry-meta/use-inquiry-meta-delete';
import { useInquiryMetaList } from '@/hooks/api/inquiry-meta/use-inquiry-meta-list';
import { Table } from '@tanstack/react-table';

export default function InquiryMetaColumnsHeader({ table }: { table: Table<InquiryMetaSchema> }) {
  const toast = useToast();
  const { refetch } = useInquiryMetaList();
  const { mutateAsync } = useInquiryMetaDelete();

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
