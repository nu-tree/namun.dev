'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { BoardSchema } from '@/lib/hono/api/service/board/schema/board.schema';
import BoardsColumnsHeader from './boards-columns-header';

export const boardsColumns: ColumnDef<BoardSchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '게시판 ID',
    accessorKey: 'slug',
  },
  {
    header: '이름',
    accessorKey: 'title',
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: ({ table }) => <BoardsColumnsHeader table={table} />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/boards/${row.original.id}`}>상세보기</Link>
        </Button>
      );
    },
  },
];
