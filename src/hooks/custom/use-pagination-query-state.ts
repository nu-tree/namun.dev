import { parseAsInteger, useQueryStates } from 'nuqs';
import { useSearchByQuery } from '@/components/pages/dashboard/common-ui/search-wrapper';

export function usePaginationQueryState({ pageRows = 10 }: { pageRows?: number } = {}) {
  const [pagination, setPagination] = useQueryStates(
    {
      pageRows: parseAsInteger.withDefault(pageRows),
      page: parseAsInteger.withDefault(1),
    },
    { clearOnDefault: false }
  );

  const { onClear, onSearch } = useSearchByQuery();
  onClear(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  });
  onSearch(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  });

  const pageToLimitOffset = (_pagination: typeof pagination) => {
    const { pageRows, page } = _pagination;
    const limit = pageRows ?? 10;
    const offset = limit * ((page ?? 1) - 1) + 1;
    return { limit, offset };
  };

  return { pagination, setPagination, pageToLimitOffset };
}
