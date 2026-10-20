import ManageList from '@/components/layout/dashboard/manage-list';
import { OrganizationTable } from '@/components/pages/dashboard/organizations/organizations-table';

const searchOptions = [{ value: 'name', label: '이름' }];

export default async function Page() {
  return (
    <ManageList
      url="organizations"
      titleName="조직"
      placeholderExample={['조직 이름']}
      tableNode={<OrganizationTable />}
      searchOptions={searchOptions}
    />
  );
}
