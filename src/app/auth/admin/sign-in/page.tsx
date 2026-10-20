import { SignInAdminForm } from '@/components/pages/dashboard/auth/sign-in-admin-form';
import { Card, CardContent } from '@/components/ui/card';

export default async function Page() {
  return (
    <Card className="border bg-white w-full max-w-3xl">
      <CardContent className="p-6">
        {/* Card Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">관리자 로그인</h1>
        </div>

        {/* Login Form */}
        <SignInAdminForm />
      </CardContent>
    </Card>
  );
}
