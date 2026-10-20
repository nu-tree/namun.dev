import { SetupAdminForm } from '@/components/pages/dashboard/auth/setup-admin-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자 등록',
};

export default async function Page() {
  return (
    <Card className="w-full max-w-3xl flex flex-col items-center gap-0">
      <CardHeader className="flex-1 w-full text-center">
        <CardTitle className="text-2xl font-bold">관리자 등록</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 w-full">
        <SetupAdminForm />
      </CardContent>
    </Card>
  );
}
