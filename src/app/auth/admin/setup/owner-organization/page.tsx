import { auth } from '@/lib/auth';
import { getCurrentSession } from '@/lib/auth/get-current-session.server';
import { OWNER_ORG_SLUG } from '@/lib/constants/site-setting-constants';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getCurrentSession();

  if (!session.data) {
    redirect('/setup');
  }

  await auth.api.createOrganization({
    body: {
      name: 'Site Owner',
      slug: OWNER_ORG_SLUG,
    },
    headers: await headers(),
  });
  redirect('/admin');
}
