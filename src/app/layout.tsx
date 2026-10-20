import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { cn } from '@/lib/utils/utils';
import { TanstackQueryProvider } from '@/lib/setting/tanstack-query/provider';
import { notoSansKr } from '@/config/font';
import { DesignedAlert } from '@/components/custom-ui/designed-alert/designed-alert';
import { DesignedConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm';
import { Toaster } from '@/components/ui/sonner';
import { SearchByQueryProvider } from '@/components/pages/dashboard/common-ui/search-wrapper';
import { ApiErrorHandlerProvider } from '@/components/layout/api-error-handler-provider';
import { getSiteSettings, getSiteSettingValue } from '@/lib/utils/get-site-setting';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const settings = await getSiteSettings();

  const siteName = getSiteSettingValue(settings, 'seo_site_name') || 'Wefactory Development';
  const siteDescription = getSiteSettingValue(settings, 'seo_site_description') || 'Wefactory Development';
  const siteKeywords = getSiteSettingValue(settings, 'seo_site_keywords') || 'Wefactory Development';
  const siteImage = getSiteSettingValue(settings, 'seo_site_image') || '';
  const ogDescription = getSiteSettingValue(settings, 'seo_og_description') || '';
  const faviconUrl = getSiteSettingValue(settings, 'favicon_image') || '/favicon.ico';

  return {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    icons: {
      icon: [
        { url: faviconUrl, sizes: '32x32', type: 'image/png' },
        { url: faviconUrl, sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: faviconUrl, sizes: '180x180', type: 'image/png' }],
      shortcut: faviconUrl,
    },
    description: siteDescription,
    keywords: siteKeywords,
    applicationName: siteName,
    openGraph: {
      title: siteName,
      description: ogDescription || siteDescription,
      type: 'website',
      locale: 'ko_KR',
      siteName: siteName,
      images: siteImage ? [{ url: siteImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
    },
    verification: {
      naver: getSiteSettingValue(settings, 'naver_site_verification') || '',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(`antialiased min-h-screen tracking-[-0.04rem]`, notoSansKr.className)}>
        <SearchByQueryProvider>
          <TanstackQueryProvider>
            <ApiErrorHandlerProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </ApiErrorHandlerProvider>
          </TanstackQueryProvider>
          <DesignedAlert />
          <DesignedConfirm />
          <Toaster />
        </SearchByQueryProvider>
      </body>
    </html>
  );
}
