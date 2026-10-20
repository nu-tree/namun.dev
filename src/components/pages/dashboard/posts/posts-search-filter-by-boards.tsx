'use client';
import { MultiValueFilter } from '@/components/pages/dashboard/common-ui/search-wrapper';
import { Button } from '@/components/ui/button';
import { useBoardSlugList } from '@/hooks/api/board/use-board-slug-list';

export default function PostsSearchFilterByBoards() {
  const { data, isLoading, error } = useBoardSlugList();

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" className="text-[12px] h-7 cursor-default hover:bg-white hover:font-medium">
        게시판 로딩중...
      </Button>
    );
  }

  if (error) {
    return <div>문제가 발생했습니다.</div>;
  }

  return (
    <MultiValueFilter
      queryKey="board"
      options={data?.data.map(({ slug, title }) => ({ label: title, value: slug })) || []}
    />
  );
}
