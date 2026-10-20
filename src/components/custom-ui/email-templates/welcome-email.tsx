import React from 'react';
import { BaseEmailTemplate } from './base-email-template';
import { Text, Button, Hr, Section, Row, Column } from '@react-email/components';

type Props = React.HTMLAttributes<HTMLElement> & {
  password?: string; // Optional prop for initial password
};

export const WelcomeEmail = ({ className, password }: Readonly<Props>) => {
  return (
    <BaseEmailTemplate>
      <Section className="text-center">
        <Text className="text-gray-800 text-2xl font-bold mb-4">안녕하세요! WeFactory 계정이 생성되었습니다.</Text>

        <Text className="text-gray-600 text-base leading-relaxed mb-6">
          관리자가 회원님의 계정을 생성하였습니다.
          <br />
          초기 비밀번호를 사용하여 로그인 후, 비밀번호를 변경해주세요.
        </Text>

        <Text className="text-gray-600 text-base leading-relaxed mb-4">
          초기 비밀번호: <strong>{password}</strong>
        </Text>

        <Text className="text-gray-600 text-base leading-relaxed mb-8">
          아래 버튼을 클릭하여 로그인하시고 서비스를 시작해보세요.
        </Text>

        <Button
          href="/auth/sign-in"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors"
        >
          🚀 로그인하기
        </Button>

        <Hr className="border-gray-200 my-8" />

        {/* Features */}
        <Section className="text-center">
          <Text className="text-gray-800 text-lg font-semibold mb-4">✨ 주요 기능</Text>

          <Row className="max-w-md mx-auto">
            <Column className="text-left">
              <Text className="text-gray-700 mb-3">📊 대시보드를 통한 실시간 모니터링</Text>
              <Text className="text-gray-700 mb-3">👥 사용자 및 조직 관리</Text>
            </Column>
            <Column className="text-left">
              <Text className="text-gray-700 mb-3">📝 게시판 및 콘텐츠 관리</Text>
              <Text className="text-gray-700 mb-3">💬 문의사항 및 알림 관리</Text>
            </Column>
          </Row>
        </Section>

        <Hr className="border-gray-200 my-8" />

        <Text className="text-gray-500 text-sm">문의사항이 있으시면 언제든지 고객센터에 연락해주세요.</Text>
      </Section>
    </BaseEmailTemplate>
  );
};
