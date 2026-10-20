'use client';

import { DataTable } from '@/components/pages/dashboard/common-ui/data-table';
import { postsColumns } from './posts-columns';
import { Pagination } from '@/components/pages/dashboard/common-ui/pagination';
import { usePostList } from '@/hooks/api/post/use-post-list';

export const PostsTable = () => {
  const { data, isLoading, error } = usePostList();

  return (
    <div>
      <DataTable
        columns={postsColumns}
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
