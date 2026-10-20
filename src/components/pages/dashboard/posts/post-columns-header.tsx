'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { useToast } from '@/hooks/custom/use-toast';
import { PostSchema } from '@/lib/hono/api/service/post/schema/post.schema';
import { usePostDelete } from '@/hooks/api/post/use-post-delete';
import { usePostList } from '@/hooks/api/post/use-post-list';

export default function PostColumnsHeader({ table }: { table: Table<PostSchema> }) {
  const toast = useToast();
  const { refetch } = usePostList();
  const { mutateAsync, isPending } = usePostDelete();

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
      className="text-destructive hover:text-destructive ml-auto cursor-pointer "
    >
      <Trash2 />
      {isPending ? '삭제 중' : '선택 삭제'}
    </Button>
  );
}
