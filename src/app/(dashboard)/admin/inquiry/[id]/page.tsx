import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { InquiryReplyForm } from '@/components/pages/dashboard/inquiry/forms/inquiry-reply-form';
import { InquiryDetailView } from '@/components/pages/dashboard/inquiry/forms/inquiry-detail-view';

type PageProps = {
  params: Promise<{ [key: string]: string | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = (await params) as { id: string };
  return (
    <DetailPageWrapper listPageLink="/admin/inquiry">
      <DetailPageHeader>문의 상세</DetailPageHeader>

      <InquiryDetailView inquiryId={id} />

      <InquiryReplyForm id={id} />

      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
