import { PasswordRule } from '@/lib/constants/password-rule';
import { z } from 'zod';

export const SignUpSchema = z
  .object({
    name: z.string('이름을 입력해주세요'),
    phoneNumber: z
      .string('전화번호를 입력해주세요')
      .min(1, '전화번호를 입력해주세요')
      .regex(/^01[0-9]{8,9}$/, '올바른 전화번호 형식을 입력해주세요')
      .optional()
      .nullable(),
    email: z.email('올바른 이메일 형식을 입력해주세요'),
    password: PasswordRule,
    passwordConfirm: z.string('비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignUpSchema = z.infer<typeof SignUpSchema>;
