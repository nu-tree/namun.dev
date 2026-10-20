import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { InquiryMetaForm } from '@/components/pages/dashboard/inquiry-meta/form/inquiry-meta-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  params: Promise<{ [key: string]: string | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = (await params) as { id: string };

  return (
    <DetailPageWrapper listPageLink="/admin/inquiry-meta">
      <DetailPageHeader>문의 게시판</DetailPageHeader>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription className="sr-only">문의 게시판 기본 정보입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <InquiryMetaForm id={id} />
        </CardContent>
      </Card>
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
