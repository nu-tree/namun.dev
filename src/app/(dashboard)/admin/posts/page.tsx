import { PostsTable } from '@/components/pages/dashboard/posts/posts-table';
import ManageList from '@/components/layout/dashboard/manage-list';
import { MultiValueFilter } from '@/components/pages/dashboard/common-ui/search-wrapper';
import PostsSearchFilterByBoards from '@/components/pages/dashboard/posts/posts-search-filter-by-boards';

const searchOptions = [{ value: 'title', label: '제목' }];

const filterOptions1 = [
  { value: 'true', label: '비밀글' },
  { value: 'false', label: '공개글' },
];

export default async function PostsPage() {
  return (
    <ManageList
      url="posts"
      titleName="게시물"
      placeholderExample={['게시물 이름']}
      tableNode={<PostsTable />}
      searchOptions={searchOptions}
      searchNode={[
        <PostsSearchFilterByBoards key="boards-filter" />,
        <MultiValueFilter key="secret-filter" queryKey="isSecret" options={filterOptions1} />,
      ]}
    />
  );
}
