import { MultiValueFilter } from '@/components/pages/dashboard/common-ui/search-wrapper';
import { UsersTable } from '@/components/pages/dashboard/users/users-table';
import ManageList from '@/components/layout/dashboard/manage-list';
import { USER_ROLE_OPTIONS } from '@/lib/constants/user-role-constants';

const searchOptions = [
  { value: 'name', label: '이름' },
  { value: 'email', label: '이메일' },
  { value: 'phoneNumber', label: '전화번호' },
];

export default async function Page() {
  return (
    <ManageList
      // url="users"
      titleName="회원"
      placeholderExample={['이름', '이메일', '전화번호']}
      tableNode={<UsersTable />}
      searchOptions={searchOptions}
      searchNode={[<MultiValueFilter key="userRole" queryKey="userRole" options={USER_ROLE_OPTIONS} />]}
    />
  );
}
