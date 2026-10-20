'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { boardsColumns } from './boards-columns';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { useBoardList } from '@/hooks/api/board/use-board-list';

export const BoardsTable = () => {
  const { data, isLoading, error } = useBoardList();

  return (
    <div>
      <DataTable
        columns={boardsColumns}
        data={data?.data || []}
        isLoading={isLoading}
        errorUi={error && <div>{error.message}</div>}
      />
      <div className="px-4 border-t">
        <Pagination totalItems={data?.totalCounts || 0} />
      </div>
    </div>
  );
};
