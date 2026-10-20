'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { format, parseISO } from 'date-fns';
import { InquirySchema } from '@/lib/hono/api/service/inquiry/schema/inquiry.schema';
import InquiryColumnsDeleteHeader from './inquiry-columns-header';

export const inquiryColumns: ColumnDef<InquirySchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '게시판',
    accessorKey: 'inquiryMeta.title',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value;
    },
  },
  {
    header: '문의 제목',
    accessorKey: 'title',
  },
  {
    header: '답변 여부',
    accessorKey: 'isAnswered',
    cell: ({ getValue }) => {
      const value = getValue<boolean>();
      return value ? (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✓ 답변 완료
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          ⏱ 답변 대기
        </span>
      );
    },
  },
  {
    header: '작성일',
    accessorKey: 'createdAt',
    cell: ({ getValue }) => {
      const value = getValue<Date | string>();
      // value가 string이면 Date로 변환, Date면 그대로 사용
      const date = value instanceof Date ? value : typeof value === 'string' ? parseISO(value) : null;
      return date && date !== null ? format(date, 'yyyy.MM.dd') : '';
    },
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: ({ table }) => <InquiryColumnsDeleteHeader table={table} />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/inquiry/${row.original.id}`}>상세보기</Link>
        </Button>
      );
    },
  },
];
