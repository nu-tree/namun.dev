import BoardForm from '@/components/pages/dashboard/boards/form/board-form';
import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import React from 'react';

export default async function Page() {
  return (
    <DetailPageWrapper listPageLink="/admin/boards">
      <DetailPageHeader>게시판 상세정보</DetailPageHeader>
      <BoardForm />
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
