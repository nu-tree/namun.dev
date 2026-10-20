'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { useToast } from '@/hooks/custom/use-toast';
import { Table } from '@tanstack/react-table';
import { BannerSchema } from '@/lib/hono/api/service/banner/schema/banner.schema';
import { useBannerList } from '@/hooks/api/banner/use-banner-list';
import { useBannerDelete } from '@/hooks/api/banner/use-banner-delete';

export default function BannersColumnsHeader({ table }: { table: Table<BannerSchema> }) {
  const toast = useToast();
  const { refetch } = useBannerList();
  const { mutateAsync, isPending } = useBannerDelete();

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
    <Button
      disabled={isPending}
      onClick={handleClickDelete}
      variant="ghost"
      className="text-destructive hover:text-destructive ml-auto flex cursor-pointer items-center"
    >
      <Trash2 />
      {isPending ? '삭제 중' : '선택 삭제'}
    </Button>
  );
}
