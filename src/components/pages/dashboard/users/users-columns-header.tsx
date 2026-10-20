'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { exportToExcel } from '@/lib/utils/export-to-excel';
import { useToast } from '@/hooks/custom/use-toast';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { useUserList, useUserListForExcel } from '@/hooks/api/user/use-user-list';
import { useUserDelete } from '@/hooks/api/user/use-user-delete';
import { formatDate } from 'date-fns';
import { UserSchema } from '@/lib/hono/api/service/user/schema/user.schema';
import { Table } from '@tanstack/react-table';

export default function UsersColumnsHeader({ table }: { table: Table<UserSchema> }) {
  const toast = useToast();
  const { refetch } = useUserList();
  const { mutateAsync } = useUserDelete();

  const { mutateAsync: allToExcel } = useUserListForExcel();
  const handleExportExcel = () => {
    const selectedRows = table?.getSelectedRowModel().rows;
    const selectedData = selectedRows?.map((row) => row.original);

    if (selectedData && selectedData.length > 0) {
      //특정값 선택시 해당값만 다운로드
      const exportData = selectedData.map(({ name, email, phoneNumber }) => ({
        이름: name,
        이메일: email,
        전화번호: phoneNumber,
      }));
      const today = formatDate(new Date(), 'yyyyMMdd_HHmmss');
      exportToExcel(exportData, `user_list_${today}.xlsx`);
    } else {
      //미선택시 모든값 다운로드
      allToExcel();
    }
  };

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="size-8 p-0 cursor-pointer">
          <span className="sr-only">메뉴 열기</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleClickDelete} className="text-destructive flex items-center cursor-pointer">
          <Trash2 className="text-destructive" />
          선택 삭제
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcel} className="cursor-pointer">
          엑셀 내보내기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
