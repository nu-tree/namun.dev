import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserForm } from '@/components/pages/dashboard/users/forms/users-form';

export default async function Page() {
  return (
    <DetailPageWrapper listPageLink="/admin/users">
      <DetailPageHeader>회원 추가</DetailPageHeader>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription className="sr-only">회원의 기본 정보입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
