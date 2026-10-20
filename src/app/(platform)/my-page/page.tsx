import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import BasicForm from '@/components/pages/platform/sub-page/my-page/basic-form';
import PasswordForm from '@/components/pages/platform/sub-page/my-page/password-form';
import { getCurrentSession } from '@/lib/auth/get-current-session.server';

export default async function Page() {
  const session = await getCurrentSession();
  if (!session) {
    redirect('/');
  }

  return (
    <section>
      <article className="max-w-xl mx-auto my-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>내 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <BasicForm id={session?.data?.user?.id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">비밀번호 변경</CardTitle>
          </CardHeader>
          <CardContent>
            <PasswordForm id={session?.data?.user?.id} />
          </CardContent>
        </Card>
      </article>
    </section>
  );
}
