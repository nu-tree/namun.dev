'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCheckBoxColumnDef } from '@/components/pages/dashboard/common-ui/data-table';
import { Badge } from '@/components/ui/badge';
import { BannerSchema } from '@/lib/hono/api/service/banner/schema/banner.schema';
import BannersColumnsHeader from './banners-columns-header';

export const bannersColumns: ColumnDef<BannerSchema>[] = [
  getCheckBoxColumnDef({ id: 'select' }),
  {
    header: '식별자',
    accessorKey: 'slug',
  },
  {
    header: '가로 길이',
    accessorKey: 'bannerWidth',
  },
  {
    header: '세로 길이',
    accessorKey: 'bannerHeight',
  },
  {
    header: '표시',
    cell: ({ row }) => {
      const isView = row.original.isView;
      return <Badge variant={isView ? 'default' : 'outline'}>{isView ? '표시' : '비표시'}</Badge>;
    },
  },
  {
    accessorKey: 'functions',
    meta: { align: 'right' },
    header: ({ table }) => <BannersColumnsHeader table={table} />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/banners/${row.original.id}`}>상세보기</Link>
        </Button>
      );
    },
  },
];
