'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { format } from 'date-fns/format';
import { useToast } from '@/hooks/custom/use-toast';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { OrganizationSchema } from '@/lib/hono/api/service/organization/schema/organization.schema';
import { useOrganizationsDelete } from '@/hooks/api/organization/use-organization-delete';
import { useOrganizationList } from '@/hooks/api/organization/use-organization-list';
import OrganizationColumnsHeader from './organization-columns-header';

export const organizationsColumns: ColumnDef<OrganizationSchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '조직 ID',
    accessorKey: 'slug',
  },
  {
    header: '조직 이름',
    accessorKey: 'name',
  },
  {
    header: '생성일시',
    accessorKey: 'createdAt',
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return format(date, 'yyyy년 MM월 dd일');
    },
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: ({ table }) => <OrganizationColumnsHeader table={table} />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/organizations/${row.original.id}`}>상세보기</Link>
        </Button>
      );
    },
  },
];
