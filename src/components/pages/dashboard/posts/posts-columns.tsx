'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { differenceInHours } from 'date-fns/differenceInHours';
import { PostSchema } from '@/lib/hono/api/service/post/schema/post.schema';
import PostColumnsHeader from './post-columns-header';
import { format } from 'date-fns';

export const postsColumns: ColumnDef<PostSchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '제목',
    accessorKey: 'title',
    cell: ({ row, getValue }) => {
      const title = getValue<string>();
      const createdAt = row.original.createdAt;
      const isNew = differenceInHours(new Date(), new Date(createdAt)) <= 24;
      const isSecret = row.original.isSecret;

      return (
        <div className="flex items-center gap-3">
          <span>{title}</span>
          {isNew && <div className="text-xs text-red-500">New</div>}
          {isSecret && <div className="text-xs text-gray-500">비밀글</div>}
        </div>
      );
    },
  },
  {
    header: '작성일시',
    accessorKey: 'createdAt',
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    },
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: ({ table }) => <PostColumnsHeader table={table} />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/posts/${row.original.id}`}>상세보기</Link>
        </Button>
      );
    },
  },
];
