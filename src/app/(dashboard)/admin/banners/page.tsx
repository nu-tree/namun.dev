import { BannersTable } from '@/components/pages/dashboard/banners/banners-table';
import ManageList from '@/components/layout/dashboard/manage-list';
import { MultiValueFilter } from '@/components/pages/dashboard/common-ui/search-wrapper';

const searchOptions = [{ value: 'slug', label: '식별자' }];

const filterOptions1 = [
  { value: 'true', label: '표시 배너' },
  { value: 'false', label: '비표시 배너' },
];

// const filterOPtions2 = [
//   { value: 'PC', label: 'PC' },
//   { value: 'MOBILE', label: 'MOBILE' },
//   { value: 'ALL', label: 'ALL' },
// ];

export default async function BannerPages() {
  return (
    <ManageList
      titleName="배너"
      placeholderExample={['배너 식별자']}
      tableNode={<BannersTable />}
      searchOptions={searchOptions}
      searchNode={[
        <MultiValueFilter key="isView" queryKey="isView" options={filterOptions1} />,
        // <MultiValueFilter queryKey="displayType" options={filterOPtions2} />,
      ]}
      url="banners"
    />
  );
}
