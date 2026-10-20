import { hasSetup } from '@/lib/auth/has-setup.server';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasSetupResult = await hasSetup();
  if (hasSetupResult) {
    redirect('/admin');
  }

  return <>{children}</>;
}
