'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { InquiryMetaSchema } from '@/lib/hono/api/service/inquiry-meta/schema/inquiry-meta.schema';
import InquiryMetaColumnsHeader from './inquiry-meta-columns-header';

export const inquiryMetaColumns: ColumnDef<InquiryMetaSchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '문의 ID',
    accessorKey: 'slug',
  },
  {
    header: '게시판 이름',
    accessorKey: 'title',
  },
  {
    header: '담당자',
    accessorKey: 'managerName',
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return value ? value : '담당자 할당 필요';
    },
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: ({ table }) => <InquiryMetaColumnsHeader table={table} />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/inquiry-meta/${row.original.id}`}>상세보기</Link>
        </Button>
      );
    },
  },
];
