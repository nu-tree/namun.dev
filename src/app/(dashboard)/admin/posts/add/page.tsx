import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { PostForm } from '@/components/pages/dashboard/posts/form/post-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  return (
    <DetailPageWrapper listPageLink="/admin/posts">
      <DetailPageHeader>게시물 추가</DetailPageHeader>
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm />
        </CardContent>
      </Card>
      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
