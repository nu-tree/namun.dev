import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { OrganizationForm } from '@/components/pages/dashboard/organizations/form/organization-form';
import { AddMemberForm } from '@/components/pages/dashboard/organizations/form/add-member-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { OrganizationMemberTable } from '@/components/pages/dashboard/organizations/organization-member-table';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPageWrapper listPageLink="/admin/organizations">
      <DetailPageHeader>조직 상세정보</DetailPageHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="sr-only">
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <OrganizationForm id={id} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>관리자 추가</CardTitle>
          </CardHeader>
          <CardContent>
            <AddMemberForm />
          </CardContent>
        </Card>
      </div>

      <div className="border bg-white">
        <OrganizationMemberTable />
      </div>

      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
