import React from 'react';
import { BaseEmailTemplate } from './base-email-template';
import { Text, Button, Hr, Section, Row, Column } from '@react-email/components';

type Props = React.HTMLAttributes<HTMLElement>;

export const NotificationEmail = ({ className }: Readonly<Props>) => {
  return (
    <BaseEmailTemplate>
      <Section className="text-center">
        <Text className="text-gray-800 text-2xl font-bold mb-4">새로운 알림이 도착했습니다</Text>

        <Text className="text-gray-600 text-base leading-relaxed mb-6">안녕하세요! 새로운 알림이 도착했습니다.</Text>

        <Section className="bg-gray-50 border border-gray-200 rounded-md p-6 my-6">
          <Text className="text-gray-700 text-base leading-relaxed">
            새로운 알림이 도착했습니다. 확인해보시기 바랍니다.
          </Text>
        </Section>

        <Button
          href="/dashboard"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors"
        >
          📊 대시보드로 이동
        </Button>

        <Hr className="border-gray-200 my-8" />

        {/* Quick Actions */}
        <Section className="text-center">
          <Text className="text-gray-800 text-lg font-semibold mb-6">🚀 빠른 액션</Text>

          <Row className="max-w-md mx-auto">
            <Column className="text-center">
              <Button
                href="/admin/members"
                className="bg-green-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-green-700 transition-colors"
              >
                👥 사용자 관리
              </Button>
            </Column>
            <Column className="text-center">
              <Button
                href="/admin/posts"
                className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-purple-700 transition-colors"
              >
                📝 게시글 관리
              </Button>
            </Column>
          </Row>
        </Section>

        <Hr className="border-gray-200 my-8" />

        <Text className="text-gray-500 text-sm">이 알림에 대해 문의사항이 있으시면 관리자에게 연락해주세요.</Text>
      </Section>
    </BaseEmailTemplate>
  );
};
