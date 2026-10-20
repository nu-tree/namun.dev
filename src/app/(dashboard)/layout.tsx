import { SidebarProvider } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Header } from '@/components/layout/dashboard/header';
import { ApplicationSideBar } from '@/components/layout/dashboard/aplication-side-bar';
import { MenuStructure } from '@/components/custom-ui/sidebar/sidebar-menus';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { hasSetup } from '@/lib/auth/has-setup.server';
import { getCurrentSession } from '@/lib/auth/get-current-session.server';

export const metadata: Metadata = {
  title: '관리자',
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasSetupResult = await hasSetup();
  if (!hasSetupResult) {
    redirect('/auth/admin/setup');
  }

  const session = await getCurrentSession();
  if (session.data?.user.role !== 'admin') {
    redirect('/auth/sign-in');
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <ApplicationSideBar menus={MenuStructure} />
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{ '--header-height': 'calc(var(--spacing)*16)' } as React.CSSProperties}
        >
          <Header />
          <ScrollArea className="h-[calc(100vh-var(--header-height))]">
            <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-var(--header-height))] dark:bg-gray-900">
              {children}
            </main>
          </ScrollArea>
        </div>
      </div>
    </SidebarProvider>
  );
}
