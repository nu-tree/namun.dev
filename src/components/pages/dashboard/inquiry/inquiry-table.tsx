'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { inquiryColumns } from './inquiry-columns';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { useInquiryList } from '@/hooks/api/inquiry/use-inquiry-list';

export const InquiryTable = () => {
  const { data, isLoading, error } = useInquiryList();

  return (
    <div>
      <DataTable
        columns={inquiryColumns}
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
