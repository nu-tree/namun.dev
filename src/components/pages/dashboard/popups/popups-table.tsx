'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { popupsColumns } from './popups-columns';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { usePopupList } from '@/hooks/api/popup/use-popup-list';

export const PopupsTable = () => {
  const { data, isLoading, error } = usePopupList();

  return (
    <div>
      <DataTable
        columns={popupsColumns}
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
