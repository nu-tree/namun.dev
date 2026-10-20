import { EmailTemplate } from '@/lib/constants/notification/email-template.enum';
import { z } from 'zod';

/** 이메일 발송 요청 */
export const SendEmailSchema = z.object({
  email: z.string(),
  template: EmailTemplate,
  emailTemplateProps: z.record(z.string(), z.any()).optional(),
});

export type SendEmailSchema = z.infer<typeof SendEmailSchema>;

/** 이메일 발송 응답 */
export const SendEmailResponseSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.array(z.string()),
  created_at: z.string(),
});

export type SendEmailResponseSchema = z.infer<typeof SendEmailResponseSchema>;

/** SMS 발송 요청 */
export const SendSMSSchema = z.object({
  message: z.string().min(1, '메시지를 입력해주세요'),
  phoneNumber: z.string().min(1, '전화번호를 입력해주세요'),
});

export type SendSMSSchema = z.infer<typeof SendSMSSchema>;

/** SMS 발송 응답 */
export const SendSMSResponseSchema = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  messageId: z.string().optional(),
});

export type SendSMSResponseSchema = z.infer<typeof SendSMSResponseSchema>;

/** 알림톡 발송 요청 */
export const SendAlimtalkSchema = z.object({
  phoneNumber: z.string().regex(/^01[0-9]-\d{3,4}-\d{4}$/, '올바른 휴대폰 번호 형식이 아닙니다'),
  templateId: z.string().min(1, '템플릿 ID를 입력해주세요'),
  variables: z.record(z.string(), z.any()).optional(),
  userId: z.string().optional(),
  message: z.string().optional(),
});

export type SendAlimtalkSchema = z.infer<typeof SendAlimtalkSchema>;

/** 알림톡 발송 응답 */
export const SendAlimtalkResponseSchema = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  messageId: z.string().optional(),
});

export type SendAlimtalkResponseSchema = z.infer<typeof SendAlimtalkResponseSchema>;
