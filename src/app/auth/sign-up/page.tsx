import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '@/components/pages/auth/sign-up-form';

export default async function Page() {
  return (
    <Card className="w-full max-w-md flex flex-col items-center gap-0">
      <CardHeader className="flex-1 w-full text-center">
        <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 w-full">
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
