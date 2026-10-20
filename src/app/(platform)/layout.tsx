import { NaverAnalytics } from '@/components/custom-ui/naver-analytics/naver-analytics';
import { GoogleAnalytics } from '@next/third-parties/google';
import { getSiteSettingByKey } from '@/lib/utils/get-site-setting';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaData = await getSiteSettingByKey('analytics_google');
  const naData = await getSiteSettingByKey('analytics_naver');

  return (
    <>
      {children}
      {gaData?.value ? <GoogleAnalytics gaId={gaData.value} /> : null}
      {naData?.value ? <NaverAnalytics naId={naData.value} /> : null}
    </>
  );
}
