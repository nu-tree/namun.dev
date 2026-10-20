import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { UserNewPasswordFormSchema } from './user-form-schema';
import { generateRandomPassword } from '@/lib/utils/generate-random-password';
import { useState } from 'react';

export const MemberFormNewPassword = ({ className }: { className?: string }) => {
  const [passwordMsg, setPasswordMsg] = useState('');
  const form = useFormContext<UserNewPasswordFormSchema>();
  const memberId = form.getValues('id');

  const generatePassword = () => {
    const password = generateRandomPassword(8);
    form.setValue('password', password);
    form.clearErrors('password');
    setPasswordMsg('비밀번호가 생성되었습니다. 회원 수정 버튼을 눌러야 변경사항이 반영됩니다.');
  };

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-2', className)}>
          <FormLabel>비밀번호*</FormLabel>
          <FormControl>
            <Input type="text" placeholder={memberId ? '****' : '비밀번호를 생성해 주세요.'} {...field} />
          </FormControl>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={generatePassword}>
              {memberId ? '새로운 비밀번호 생성' : '비밀번호 생성'}
            </Button>
          </div>
          {passwordMsg && <p className="text-sm text-muted-foreground">{passwordMsg}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
