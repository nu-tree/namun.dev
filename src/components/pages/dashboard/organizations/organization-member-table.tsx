'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { organizationMembersColumns } from './organization-members-columns';
import { useParams } from 'next/navigation';
import { useOrganizationMemberList } from '@/hooks/api/organization/use-organization-member-list';

export const OrganizationMemberTable = () => {
  const { id: organizationId } = useParams<{ id: string }>();
  const { data, isLoading, error, isRefetching } = useOrganizationMemberList(organizationId);

  return (
    <div>
      <DataTable
        columns={organizationMembersColumns}
        data={data?.data || []}
        isLoading={isLoading || isRefetching}
        errorUi={error && <div>{error.message}</div>}
      />
      <div className="px-4 border-t">
        <Pagination totalItems={data?.totalCounts || 0} />
      </div>
    </div>
  );
};
