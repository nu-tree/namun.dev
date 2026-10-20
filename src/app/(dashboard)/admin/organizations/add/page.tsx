import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { OrganizationForm } from '@/components/pages/dashboard/organizations/form/organization-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  return (
    <DetailPageWrapper listPageLink="/admin/organizations">
      <DetailPageHeader>조직 추가</DetailPageHeader>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <OrganizationForm />
        </CardContent>
      </Card>
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
