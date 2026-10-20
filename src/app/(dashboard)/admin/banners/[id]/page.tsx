import BannerForm from '@/components/pages/dashboard/banners/form/banner-form';
import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <DetailPageWrapper listPageLink="/admin/banners">
      <DetailPageHeader>배너 상세정보</DetailPageHeader>
      <BannerForm id={id} />
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
