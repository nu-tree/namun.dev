'use client';

import { ColumnDef } from '@tanstack/react-table';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { format } from 'date-fns/format';
import { Badge } from '@/components/ui/badge';
import { MemberResponseSchema } from '@/lib/hono/api/service/organization/schema/get-organization.schema';
import OrganizationMembersColumnsCell from './organization-members-columns-cell';

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'owner':
      return <Badge variant="default">오너</Badge>;
    case 'admin':
      return <Badge variant="default">관리자</Badge>;
    case 'member':
      return <Badge variant="secondary">멤버</Badge>;
    default:
      return <Badge variant="outline">알 수 없음</Badge>;
  }
};

export const organizationMembersColumns: ColumnDef<MemberResponseSchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '이름',
    accessorKey: 'name',
    cell: ({ row }) => {
      const name = row.original.user.name;
      return name || '이름 없음';
    },
  },
  {
    header: '이메일',
    accessorKey: 'email',
    cell: ({ row }) => {
      const email = row.original.user.email;
      return email || '이메일 없음';
    },
  },
  {
    header: '전화번호',
    accessorKey: 'phoneNumber',
    cell: ({ row }) => {
      const phoneNumber = row.original.user.phoneNumber;
      return phoneNumber || '전화번호 없음';
    },
  },
  {
    header: '가입일',
    accessorKey: 'createdAt',
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return format(date, 'yyyy년 MM월 dd일');
    },
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: () => {
      return null;
    },
    cell: ({ row }) => <OrganizationMembersColumnsCell row={row} />,
  },
];
