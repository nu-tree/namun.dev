import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserForm } from '@/components/pages/dashboard/users/forms/users-form';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPageWrapper listPageLink="/admin/users">
      <DetailPageHeader>회원 상세정보</DetailPageHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="sr-only">
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <UserForm id={id} />
          </CardContent>
        </Card>
      </div>

      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
