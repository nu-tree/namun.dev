import { BoardsTable } from '@/components/pages/dashboard/boards/boards-table';
import ManageList from '@/components/layout/dashboard/manage-list';

const searchOptions = [
  { value: 'slug', label: '게시판 ID' },
  { value: 'title', label: '이름' },
];

export default async function BoardsPage() {
  return (
    <ManageList
      url="boards"
      titleName="게시판"
      placeholderExample={['게시판 이름']}
      tableNode={<BoardsTable />}
      searchOptions={searchOptions}
      searchNode={[]}
    />
  );
}
