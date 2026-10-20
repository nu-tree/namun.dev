import { apiErrorHelpers, apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { zValidator } from '@hono/zod-validator';
import { SendEmailSchema, SendSMSSchema, SendAlimtalkSchema } from '../schema/notification.schema';
import { Resend } from 'resend';
import React from 'react';
import { SolapiMessageService } from 'solapi';
import { SolapiConstants } from '@/lib/constants/notification/solapi.constants';
import { getEmailTemplate } from '@/lib/constants/notification/email-template.registry';

const resend = new Resend(process.env.RESEND_API_KEY);

const solapi = new SolapiMessageService(SolapiConstants.apiKey, SolapiConstants.apiSecret);

/** 이메일 발송 */
export const sendEmail = createRouteHandler(zValidator('json', SendEmailSchema), async (c) => {
  const body = c.req.valid('json');

  try {
    const templateDef = getEmailTemplate(body.template);
    const Component: React.ComponentType<any> = templateDef.component;

    const emailOptions = {
      from: process.env.RESEND_SENDER_DOMAIN || 'onboarding@resend.dev',
      to: body.email,
      subject: templateDef.subject,
      react: React.createElement(Component as any, body.emailTemplateProps || {}),
    };

    const result = await resend.emails.send(emailOptions);

    if (result.error) {
      return apiErrorHelpers.serverError(c, '이메일 발송에 실패했습니다.');
    }

    return apiSuccess(c, result.data);
  } catch (error) {
    console.error('Send Email Error:', error);
    return apiErrorHelpers.serverError(c, '이메일 발송 중 오류가 발생했습니다.');
  }
});

/** SMS 발송 */
export const sendSMS = createRouteHandler(zValidator('json', SendSMSSchema), async (c) => {
  const body = c.req.valid('json');

  try {
    const smsOptions = {
      to: body.phoneNumber,
      from: process.env.SOLAPI_SENDER || '',
      text: body.message,
      type: 'SMS' as const,
    };

    const result = await solapi.send(smsOptions);

    if (result.failedMessageList && result.failedMessageList.length > 0) {
      return apiErrorHelpers.serverError(c, 'SMS 발송에 실패했습니다.');
    }

    return apiSuccess(c, result);
  } catch (error) {
    console.error('Send SMS Error:', error);
    return apiErrorHelpers.serverError(c, 'SMS 발송 중 오류가 발생했습니다.');
  }
});

/** 알림톡 발송 */
export const sendAlimtalk = createRouteHandler(zValidator('json', SendAlimtalkSchema), async (c) => {
  const body = c.req.valid('json');

  try {
    const alimtalkOptions = {
      to: body.phoneNumber,
      from: process.env.SOLAPI_SENDER || '',
      kakaoOptions: {
        pfId: process.env.SOLAPI_PFID || '',
        templateId: body.templateId,
        variables: body.variables || {},
      },
      type: 'ATA' as const, // 알림톡 타입
    };

    const result = await solapi.send(alimtalkOptions);

    if (result.failedMessageList && result.failedMessageList.length > 0) {
      return apiErrorHelpers.serverError(c, '알림톡 발송에 실패했습니다.');
    }

    return apiSuccess(c, result);
  } catch (error) {
    console.error('Send Alimtalk Error:', error);
    return apiErrorHelpers.serverError(c, '알림톡 발송 중 오류가 발생했습니다.');
  }
});
