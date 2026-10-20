import { Resend } from 'resend';
import { SolapiMessageService } from 'solapi';
import { getEmailTemplate, emailTemplateRegistry } from '@/lib/constants/notification/email-template.registry';
import { TypedSendEmailRequest } from '@/lib/constants/notification/email-generic.types';
import { SolapiConstants } from '@/lib/constants/notification/solapi.constants';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);
const solapi = new SolapiMessageService(SolapiConstants.apiKey, SolapiConstants.apiSecret);

/**
 * 타입 안전한 이메일 발송 유틸리티 (서버 사이드 전용)
 * 서버 컴포넌트, 서버 액션, API 라우트 등에서 직접 호출 가능
 */

// 타입 안전한 sendEmail - 제네릭과 자동 추론 지원
// export const sendEmail = async <T extends keyof typeof emailTemplateRegistry>(request: TypedSendEmailRequest<T>) => {
//   return toServerFunction(NotificationService, 'sendEmail')(request);
// };

export async function sendEmailUtil<T extends keyof typeof emailTemplateRegistry>(request: TypedSendEmailRequest<T>) {
  const templateDef = getEmailTemplate(request.template);
  const Component: React.ComponentType<any> = templateDef.component;

  const emailOptions = {
    from: process.env.RESEND_SENDER_DOMAIN || 'onboarding@resend.dev',
    to: request.email,
    subject: templateDef.subject,
    react: React.createElement(Component, request.emailTemplateProps as any),
  };

  const result = await resend.emails.send(emailOptions);

  if (result.error) {
    throw new Error('이메일 발송에 실패했습니다.');
  }

  return result;
}

/**
 * SMS 발송 유틸리티 (서버 사이드 전용)
 */
export async function sendSMSUtil(phoneNumber: string, message: string) {
  const smsOptions = {
    to: phoneNumber,
    from: process.env.SOLAPI_SENDER || '',
    text: message,
    type: 'SMS' as const,
  };

  const result = await solapi.send(smsOptions);

  if (result.failedMessageList && result.failedMessageList.length > 0) {
    throw new Error('SMS 발송에 실패했습니다.');
  }

  return result;
}

/**
 * 알림톡 발송 유틸리티 (서버 사이드 전용)
 */
export async function sendAlimtalkUtil(phoneNumber: string, templateId: string, variables?: Record<string, any>) {
  const alimtalkOptions = {
    to: phoneNumber,
    from: process.env.SOLAPI_SENDER || '',
    kakaoOptions: {
      pfId: process.env.SOLAPI_PFID || '',
      templateId,
      variables: variables || {},
    },
    type: 'ATA' as const,
  };

  const result = await solapi.send(alimtalkOptions);

  if (result.failedMessageList && result.failedMessageList.length > 0) {
    throw new Error('알림톡 발송에 실패했습니다.');
  }

  return result;
}
