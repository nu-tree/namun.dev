import BannerForm from '@/components/pages/dashboard/banners/form/banner-form';
import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';

export default async function Page() {
  return (
    <DetailPageWrapper listPageLink="/admin/banners">
      <DetailPageHeader>배너 추가</DetailPageHeader>
      <BannerForm />
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
