'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { usersColumns } from './users-columns';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { useUserList } from '@/hooks/api/user/use-user-list';

export const UsersTable = () => {
  const { data, isLoading, error } = useUserList();

  return (
    <div>
      <DataTable
        columns={usersColumns}
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
