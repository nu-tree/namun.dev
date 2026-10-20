import { z } from 'zod';

export const MyInfoFormSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phoneNumber: z.string().min(1, '전화번호를 입력해주세요.'),
});

export const MyPasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
    newPassword: z
      .string()
      .min(1, '새 비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.',
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type MyInfoFormSchema = z.infer<typeof MyInfoFormSchema>;
export type MyPasswordFormSchema = z.infer<typeof MyPasswordFormSchema>;
