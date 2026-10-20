import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from '@/components/pages/auth/sign-in-form';

export default async function Page() {
  return (
    <Card className="w-full max-w-md flex flex-col items-center gap-0">
      <CardHeader className="flex-1 w-full text-center">
        <CardTitle className="text-2xl font-bold">로그인</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 w-full">
        <SignInForm />
      </CardContent>
    </Card>
  );
}
