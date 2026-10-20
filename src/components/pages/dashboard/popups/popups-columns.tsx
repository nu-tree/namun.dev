'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { format } from 'date-fns';
import { PopupSchema } from '@/lib/hono/api/service/popup/schema/popup-schema';
import PopupsColumnsHeader from './popup-columns-header';

export const popupsColumns: ColumnDef<PopupSchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '이름',
    accessorKey: 'identifier',
  },
  {
    header: '노출 방식',
    accessorKey: 'displayType',
  },
  {
    header: '노출 날짜',
    cell: ({ row }) => {
      const start = row.original.startDate;
      const end = row.original.endDate;
      const formattedStart = start ? format(new Date(start), 'yyyy.MM.dd') : '';
      const formattedEnd = end ? format(new Date(end), 'yyyy.MM.dd') : '';

      return `${formattedStart} ~ ${formattedEnd}`;
    },
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: ({ table }) => <PopupsColumnsHeader table={table} />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/popups/${row.original.id}`}>상세보기</Link>
        </Button>
      );
    },
  },
];
