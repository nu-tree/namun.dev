import React from 'react';
import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PopupForm } from '@/components/pages/dashboard/popups/form/popup-form';

export default function PopUpAdd() {
  return (
    <DetailPageWrapper listPageLink="/admin/popups">
      <DetailPageHeader>팝업 추가</DetailPageHeader>
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <PopupForm />
        </CardContent>
      </Card>
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
