import BoardForm from '@/components/pages/dashboard/boards/form/board-form';
import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  return (
    <DetailPageWrapper listPageLink="/admin/boards">
      <DetailPageHeader>게시판 추가</DetailPageHeader>
      <BoardForm />
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
