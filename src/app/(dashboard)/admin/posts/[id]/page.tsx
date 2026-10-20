import { PostForm } from '@/components/pages/dashboard/posts/form/post-form';
import {
  DetailPageBackButton,
  DetailPageHeader,
  DetailPageWrapper,
} from '@/components/pages/dashboard/common-ui/detail-page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { CommentsTable } from '@/components/pages/dashboard/posts/form/comments-table-input';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DetailPageWrapper listPageLink="/admin/posts">
      <DetailPageHeader>게시물 상세정보</DetailPageHeader>

      <div className="2xl:flex space-y-6 2xl:space-y-0 gap-x-6">
        <Card className="max-w-4xl flex-1">
          <CardHeader className="sr-only">
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">
            <PostForm id={id} />
          </CardContent>
        </Card>

        <Card className="max-w-4xl h-max flex-1">
          <CardHeader className="">
            <CardTitle>댓글목록</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 ">{/* NOTE: 댓글기능 추가필요 */}</CardContent>
        </Card>
      </div>

      <DetailPageBackButton />
    </DetailPageWrapper>
  );
}
