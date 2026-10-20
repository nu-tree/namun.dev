'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { inquiryMetaColumns } from './inquiry-meta-columns';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { useInquiryMetaList } from '@/hooks/api/inquiry-meta/use-inquiry-meta-list';

export const InquiryMetaTable = () => {
  const { data, isLoading, error } = useInquiryMetaList();
  const inquiryMetaList = data?.data || [];

  return (
    <div>
      <DataTable
        columns={inquiryMetaColumns}
        data={inquiryMetaList}
        isLoading={isLoading}
        errorUi={error && <div>{error.message}</div>}
      />
      <div className="px-4 border-t">
        <Pagination totalItems={data?.totalCounts || 0} />
      </div>
    </div>
  );
};
