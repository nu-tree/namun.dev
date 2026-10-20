'use client';

import { Button } from '@/components/ui/button';
import { usePaginationQueryState } from '@/hooks/custom/use-pagination-query-state';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
}

export function Pagination({ totalItems }: PaginationProps) {
  const { pagination, setPagination } = usePaginationQueryState();
  const totalPages = Math.ceil(totalItems / pagination.pageRows);

  // 표시할 페이지 번호 범위 계산
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <div className="text-sm text-muted-foreground">
        전체 <span className="font-medium">{totalItems}</span>개 항목
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setPagination((prev) => ({ ...prev, page: 1 }))}
          disabled={pagination.page === 1}
        >
          <span className="sr-only">첫 페이지</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
          disabled={pagination.page === 1}
        >
          <span className="sr-only">이전 페이지</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={pagination.page === page ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setPagination((prev) => ({ ...prev, page }))}
          >
            <span className="sr-only">{page} 페이지</span>
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
          disabled={pagination.page === totalPages}
        >
          <span className="sr-only">다음 페이지</span>
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setPagination((prev) => ({ ...prev, page: totalPages }))}
          disabled={pagination.page === totalPages}
        >
          <span className="sr-only">마지막 페이지</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
