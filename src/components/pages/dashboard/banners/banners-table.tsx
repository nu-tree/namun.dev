'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { bannersColumns } from './banners-columns';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { useBannerList } from '@/hooks/api/banner/use-banner-list';

export const BannersTable = () => {
  const { data, isLoading, error } = useBannerList();
  const bannerData = data?.data;

  return (
    <div>
      <DataTable
        columns={bannersColumns}
        data={bannerData || []}
        isLoading={isLoading}
        errorUi={error && <div>{error.message}</div>}
      />
      <div className="px-4 border-t">
        <Pagination totalItems={data?.totalCounts || 0} />
      </div>
    </div>
  );
};
