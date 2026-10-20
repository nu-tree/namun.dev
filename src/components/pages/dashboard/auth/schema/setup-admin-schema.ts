import { PasswordRule } from '@/lib/constants/password-rule';
import { z } from 'zod';

export const SetupAdminSchema = z
  .object({
    name: z
      .string({ error: '이름을 입력해주세요' })
      .min(1, { error: '이름을 입력해주세요' })
      .min(2, { error: '이름은 2글자 이상이어야 합니다' })
      .max(50, { error: '이름은 50글자 이하여야 합니다' })
      .regex(/^[가-힣a-zA-Z]+$/, { error: '이름은 한글, 영문만 입력 가능합니다' }),

    email: z
      .string({ error: '이메일을 입력해주세요' })
      .min(1, { error: '이메일을 입력해주세요' })
      .pipe(z.email({ error: '올바른 이메일 형식을 입력해주세요' }))
      .pipe(z.string().max(30, { error: '이메일은 30글자 이하여야 합니다' })),

    password: PasswordRule,

    passwordConfirm: z
      .string({ error: '비밀번호 확인을 입력해주세요' })
      .min(1, { error: '비밀번호 확인을 입력해주세요' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type SetupAdminSchema = z.infer<typeof SetupAdminSchema>;
