import { PopupsTable } from '@/components/pages/dashboard/popups/popups-table';
import ManageList from '@/components/layout/dashboard/manage-list';
import { MultiValueFilter } from '@/components/pages/dashboard/common-ui/search-wrapper';

const searchOptions = [
  { value: 'identifier', label: '이름' },
  { value: 'displayPages', label: '노출 페이지' },
];

const filterOptions1 = [
  { value: 'PC', label: 'PC' },
  { value: 'MOBILE', label: 'MOBILE' },
  { value: 'ALL', label: 'ALL' },
];

export default async function PopupsPage() {
  return (
    <ManageList
      titleName="팝업"
      placeholderExample={['팝업 이름1', '팝업 이름2']}
      tableNode={<PopupsTable />}
      searchOptions={searchOptions}
      // searchNode={<MultiValueFilter queryKey="displayType" options={filterOptions1} />}
      url="popups"
    />
  );
}
