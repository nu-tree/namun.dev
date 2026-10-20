import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { PopupForm } from '@/components/pages/dashboard/popups/form/popup-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPageWrapper listPageLink="/admin/popups">
      <DetailPageHeader>팝업 상세정보</DetailPageHeader>

      <Card>
        <CardHeader className="sr-only">
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PopupForm id={id} />
        </CardContent>
      </Card>

      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
