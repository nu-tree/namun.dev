import ManageList from '@/components/layout/dashboard/manage-list';
import { InquiryMetaTable } from '@/components/pages/dashboard/inquiry-meta/inquiry-meta-table';
const searchOptions = [
  { value: 'slug', label: 'ID' },
  { value: 'title', label: '게시판 이름' },
];

export default async function InquiryMetaPage() {
  return (
    <ManageList
      titleName="문의 게시판"
      placeholderExample={['게시판 아이디', '게시판 이름']}
      tableNode={<InquiryMetaTable />}
      url="inquiry-meta"
      searchOptions={searchOptions}
      searchNode={[]}
    />
  );
}
