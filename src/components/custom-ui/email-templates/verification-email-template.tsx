import React from 'react';
import { BaseEmailTemplate } from './base-email-template';
import { Text, Button, Hr, Section } from '@react-email/components';

type Props = React.HTMLAttributes<HTMLElement> & {
  url: string;
};

export const VerificationEmailTemplate = ({ className, url }: Props) => {
  return (
    <BaseEmailTemplate>
      <Section className="text-center">
        <Text className="text-gray-800 text-2xl font-bold mb-4">Wefactory 메일 인증</Text>

        <Text className="text-gray-600 text-base leading-relaxed mb-6">
          메일 발송 후 24시간 이내에 인증을 완료해주세요.
        </Text>

        <Button
          href={url}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors"
        >
          메일 인증하기
        </Button>

        <Hr className="border-gray-200 my-8" />

        <Text className="text-gray-500 text-sm">이 알림에 대해 문의사항이 있으시면 관리자에게 연락해주세요.</Text>
      </Section>
    </BaseEmailTemplate>
  );
};
