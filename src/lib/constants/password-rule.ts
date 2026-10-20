import { z } from 'zod';

export const PasswordRule = z
  .string({ error: '비밀번호를 입력해주세요' })
  .min(1, { error: '비밀번호를 입력해주세요' })
  .min(6, { error: '비밀번호는 6자 이상이어야 합니다' })
  .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    error: '비밀번호는 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다',
  });
