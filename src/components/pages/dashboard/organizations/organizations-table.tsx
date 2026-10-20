'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { organizationsColumns } from './organization-columns';
import { useOrganizationList } from '@/hooks/api/organization/use-organization-list';

export const OrganizationTable = () => {
  const { data, isLoading, error } = useOrganizationList();

  return (
    <div>
      <DataTable
        columns={organizationsColumns}
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
