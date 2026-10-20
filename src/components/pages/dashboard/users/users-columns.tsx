'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { UserSchema } from '@/lib/hono/api/service/user/schema/user.schema';
import UsersColumnsHeader from './users-columns-header';

export const usersColumns: ColumnDef<UserSchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '이름',
    accessorKey: 'name',
  },
  {
    header: '이메일',
    accessorKey: 'email',
  },
  {
    header: '전화번호',
    accessorKey: 'phoneNumber',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.phoneNumber ? (
            <span className="text-muted-foreground text-sm">{row.original.phoneNumber}</span>
          ) : (
            <span className="text-muted-foreground text-sm">없음</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: ({ table }) => <UsersColumnsHeader table={table} />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/users/${row.original.id}`}>상세보기</Link>
        </Button>
      );
    },
  },
];
