'use client';
'use no memo';

import { ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Table as ReactTable } from '@tanstack/react-table';
import { LoadingUi } from './loading-ui';
import { useEffect } from 'react';
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'right' | 'left' | 'center';
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  errorUi?: React.ReactNode;
  onTableInstance?: (table: ReactTable<TData>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  errorUi,
  onTableInstance,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (onTableInstance) {
      onTableInstance(table);
    }
  }, [table]);

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(header.column.columnDef.meta?.align === 'right' && 'text-right')}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white dark:bg-gray-950">
          <RenderTableBody columns={columns} data={data} isLoading={isLoading} errorUi={errorUi} table={table} />
        </TableBody>
      </Table>
    </div>
  );
}

function RenderTableBody<TData, TValue>({
  columns,
  data,
  isLoading,
  errorUi,
  table,
}: DataTableProps<TData, TValue> & { table: ReactTable<TData> }) {
  if (isLoading)
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-32">
          <div className="flex items-center justify-center h-full">
            <LoadingUi />
          </div>
        </TableCell>
      </TableRow>
    );

  if (errorUi)
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          {errorUi}
        </TableCell>
      </TableRow>
    );

  return table.getRowModel().rows?.length ? (
    table.getRowModel().rows.map((row, index) => (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && 'selected'}
        className={cn(
          index % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-muted/30 dark:bg-gray-900',
          'max-sm:flex max-sm:flex-col',
        )}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            className={cn((cell.column.columnDef.meta as { align: string })?.align === 'right' && 'text-right')}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
}

export function getCheckBoxColumnDef<TData, TValue>({ id }: { id: string }) {
  return {
    id,
    header: ({ table }) => (
      <Checkbox
        className="cursor-pointer"
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="cursor-pointer"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  } satisfies ColumnDef<TData, TValue>;
}
