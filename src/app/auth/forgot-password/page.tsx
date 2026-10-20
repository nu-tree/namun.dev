import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForgotPasswordForm } from '@/components/pages/auth/forgot-password-form';

export default async function Page() {
  return (
    <Card className="w-full max-w-md flex flex-col items-center gap-0">
      <CardHeader className="flex-1 w-full text-center">
        <CardTitle className="text-2xl font-bold">비밀번호 찾기</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 w-full">
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
