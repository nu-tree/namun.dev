import React from 'react';
import { BaseEmailTemplate } from './base-email-template';
import { Text, Button, Hr, Section, Row, Column } from '@react-email/components';

type Props = React.HTMLAttributes<HTMLElement>;

export const PasswordResetEmail = ({ className }: Readonly<Props>) => {
  return (
    <BaseEmailTemplate>
      <Section className="text-center">
        <Text className="text-gray-800 text-2xl font-bold mb-4">🔐 비밀번호 재설정 요청</Text>

        <Text className="text-gray-600 text-base leading-relaxed mb-6">
          안녕하세요!
          <br />
          WeFactory 계정의 비밀번호 재설정을 요청하셨습니다.
        </Text>

        <Text className="text-gray-600 text-base leading-relaxed mb-8">
          아래 버튼을 클릭하여 새로운 비밀번호를 설정하실 수 있습니다. 이 링크는 <strong>24시간</strong>까지 유효합니다.
        </Text>

        <Button
          href="/auth/reset-password"
          className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-red-700 transition-colors"
        >
          🔑 비밀번호 재설정
        </Button>

        <Hr className="border-gray-200 my-8" />

        {/* Security Notice */}
        <Section className="bg-yellow-50 border border-yellow-200 rounded-md p-6 my-6">
          <Text className="text-yellow-800 text-lg font-semibold mb-4">⚠️ 보안 안내</Text>

          <Row className="max-w-md mx-auto">
            <Column className="text-left">
              <Text className="text-yellow-700 mb-2">• 본인이 요청하지 않은 경우 이 링크를 무시하세요</Text>
              <Text className="text-yellow-700 mb-2">• 링크는 한 번만 사용 가능합니다</Text>
            </Column>
            <Column className="text-left">
              <Text className="text-yellow-700 mb-2">• 비밀번호는 안전하게 관리해주세요</Text>
              <Text className="text-yellow-700 mb-2">• 의심스러운 활동이 있다면 즉시 신고하세요</Text>
            </Column>
          </Row>
        </Section>

        <Hr className="border-gray-200 my-8" />

        <Text className="text-gray-500 text-sm">문제가 있으시면 고객센터에 연락해주세요.</Text>
      </Section>
    </BaseEmailTemplate>
  );
};
