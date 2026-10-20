import {
  PageContentWrapper,
  PageContentWrapperBody,
  PageContentWrapperDescription,
  PageContentWrapperHeader,
  PageContentWrapperTitle,
  PageWrapper,
  PageWrapperHeader,
  PageWrapperTitle,
} from '@/components/pages/dashboard/common-ui/page-wrapper';
import { SiteSettingForm } from '@/components/pages/dashboard/settings/site-setting-form';
import { SiteSettingImageForm } from '@/components/pages/dashboard/settings/site-setting-image-form';

export default async function Page() {
  return (
    <PageWrapper>
      <PageWrapperTitle>
        <PageWrapperHeader>사이트설정</PageWrapperHeader>
      </PageWrapperTitle>

      <PageContentWrapper>
        <PageContentWrapperHeader>
          <PageContentWrapperTitle>애널리틱스 설정</PageContentWrapperTitle>
        </PageContentWrapperHeader>

        <PageContentWrapperBody className="space-y-4">
          <SiteSettingForm settingKey="analytics_google" />
          <SiteSettingForm settingKey="gtm_google" />
          <SiteSettingForm settingKey="analytics_naver" />
          <SiteSettingForm settingKey="naver_site_verification" />
        </PageContentWrapperBody>
      </PageContentWrapper>

      <PageContentWrapper>
        <PageContentWrapperHeader>
          <PageContentWrapperTitle>SEO 설정</PageContentWrapperTitle>
        </PageContentWrapperHeader>

        <PageContentWrapperBody className="space-y-4">
          <SiteSettingForm settingKey="seo_site_name" />
          <SiteSettingForm settingKey="seo_site_description" />
          <SiteSettingForm settingKey="seo_site_keywords" />
          <SiteSettingImageForm settingKey="favicon_image" />
          <SiteSettingImageForm settingKey="seo_site_image" />
          <SiteSettingForm settingKey="seo_og_description" />
        </PageContentWrapperBody>
      </PageContentWrapper>
    </PageWrapper>
  );
}
