import React from 'react';
import { Tailwind, Html, Head, Body, Container, Section, Text, Hr } from '@react-email/components';

type Props = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export const BaseEmailTemplate = ({ className, children }: Readonly<Props>) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-gray-50 font-sans">
          <Container className="max-w-[600px] mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Header */}
            <Section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-12 px-8 text-center">
              <Text className="text-3xl font-bold tracking-wide mb-2">WeFactory</Text>
              <Text className="text-blue-100 text-sm">Admin Dashboard</Text>
            </Section>

            {/* Content */}
            <Section className="p-8 bg-white">{children}</Section>

            {/* Footer */}
            <Section className="bg-gray-50 py-6 px-8 text-center">
              <Hr className="border-gray-200 mb-4" />
              <Text className="text-gray-600 text-sm mb-2">© 2024 WeFactory. All rights reserved.</Text>
              <Text className="text-gray-500 text-xs">이 이메일은 WeFactory 시스템에서 자동으로 발송되었습니다.</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
