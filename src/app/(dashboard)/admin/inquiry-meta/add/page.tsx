import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { InquiryMetaForm } from '@/components/pages/dashboard/inquiry-meta/form/inquiry-meta-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  return (
    <DetailPageWrapper listPageLink="/admin/inquiry-meta">
      <DetailPageHeader>문의 게시판 생성</DetailPageHeader>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription className="sr-only">회원의 기본 정보입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <InquiryMetaForm />
        </CardContent>
      </Card>
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
