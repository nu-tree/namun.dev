'use client';

import { cn } from '@/lib/utils/utils';
import { PageContentWrapper, PageContentWrapperHeader, PageContentWrapperTitle } from './page-wrapper';
import { ButtonsWrapper, ClearSearchParamsButton, SearchButton } from './buttons-wrapper';
import { Input } from '@/components/ui/input';
import { createContext, FormEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { KeywordSearchState, useKeywordSearchState } from '@/hooks/custom/use-keyword-search-state';
import { Subject } from 'rxjs';
import { useQueryState } from 'nuqs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown, X } from 'lucide-react';

type SearchByQueryContextType = {
  clear: () => void;
  onClear: (callback: () => void) => void;

  emitSearch: () => void;
  onSearch: (callback: () => void) => void;

  // 스코프 기반 초기화
  clearScoped: (scope: string) => void;
  onClearScoped: (scope: string, callback: () => void) => () => void;
};
const SearchByQueryContext = createContext<SearchByQueryContextType | null>(null);

export const useSearchByQuery = () => {
  const context = useContext(SearchByQueryContext);
  if (!context) {
    throw new Error('SearchByQueryContext is not found');
  }
  return context;
};

export const SearchByQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const clear$ = useRef(new Subject<void>());
  const search$ = useRef(new Subject<void>());
  const clearScoped$ = useRef(new Subject<string>());
  const clearCallbacks = useRef<Set<() => void>>(new Set());
  const searchCallbacks = useRef<Set<() => void>>(new Set());
  const scopedClearCallbacks = useRef<Map<string, Set<() => void>>>(new Map());

  const clear = () => {
    clear$.current.next();
  };

  const onClear = (callback: () => void) => {
    clearCallbacks.current.add(callback);
    return () => {
      clearCallbacks.current.delete(callback);
    };
  };

  const emitSearch = () => {
    search$.current.next();
  };

  const onSearch = (callback: () => void) => {
    searchCallbacks.current.add(callback);
    return () => {
      searchCallbacks.current.delete(callback);
    };
  };

  const clearScoped = (scope: string) => {
    clearScoped$.current.next(scope);
  };

  const onClearScoped = (scope: string, callback: () => void) => {
    if (!scopedClearCallbacks.current.has(scope)) {
      scopedClearCallbacks.current.set(scope, new Set());
    }
    scopedClearCallbacks.current.get(scope)!.add(callback);
    return () => {
      scopedClearCallbacks.current.get(scope)?.delete(callback);
    };
  };

  useEffect(() => {
    const clearSubscription = clear$.current.subscribe(() => {
      clearCallbacks.current.forEach((callback) => callback());
    });
    return () => clearSubscription.unsubscribe();
  }, []);

  useEffect(() => {
    const searchSubscription = search$.current.subscribe(() => {
      searchCallbacks.current.forEach((callback) => callback());
    });
    return () => searchSubscription.unsubscribe();
  }, []);

  useEffect(() => {
    const clearScopedSubscription = clearScoped$.current.subscribe((scope) => {
      const callbacks = scopedClearCallbacks.current.get(scope);
      callbacks?.forEach((callback) => callback());
    });
    return () => clearScopedSubscription.unsubscribe();
  }, []);

  return (
    <SearchByQueryContext.Provider value={{ clear, onClear, emitSearch, onSearch, clearScoped, onClearScoped }}>
      {children}
    </SearchByQueryContext.Provider>
  );
};

type SearchContentWrapperProps = React.ComponentProps<'div'> & { title: string };
export const SearchContentWrapper = ({ className, children, title, ...props }: Readonly<SearchContentWrapperProps>) => {
  return (
    <PageContentWrapper className={cn('', className)} {...props}>
      <PageContentWrapperHeader>
        <PageContentWrapperTitle>{title}</PageContentWrapperTitle>
        <ButtonsWrapper>
          <ClearSearchParamsButton />
        </ButtonsWrapper>
      </PageContentWrapperHeader>
      {children}
    </PageContentWrapper>
  );
};

type SearchParamsSearchBarProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'onKeyDown' | 'value'> & {
  options?: { value: string; label: string }[];
  keywordName?: string;
  onSearch?: (keywordOptions: KeywordSearchState) => void;
  scope?: string;
};
export const SearchParamsSearchBar = ({
  className,
  placeholder,
  options,
  name,
  keywordName,
  onSearch,
  scope,
  ...props
}: Readonly<SearchParamsSearchBarProps>) => {
  const { onClear, emitSearch, onClearScoped } = useSearchByQuery();
  const { keywordOptions, setKeywordOptions } = useKeywordSearchState({ urlKeys: { keyword: name, keywordName } });
  const [searchTerm, setSearchTerm] = useState(keywordOptions.keyword || '');
  const [searchCategory, setSearchCategory] = useState(keywordOptions.keywordName || options?.at(0)?.value || '');

  useEffect(() => {
    const cleanup = onClear(() => {
      setSearchTerm('');
      setSearchCategory(options?.at(0)?.value || '');
      setKeywordOptions({ keywordName: null, keyword: null });
    });
    return cleanup;
  }, [onClear, setKeywordOptions, options]);

  useEffect(() => {
    if (!scope) return;
    const cleanup = onClearScoped(scope, () => {
      setSearchTerm('');
      setSearchCategory(options?.at(0)?.value || '');
      setKeywordOptions({ keywordName: null, keyword: null });
    });
    return cleanup;
  }, [onClearScoped, scope, setKeywordOptions, options]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setKeywordOptions({ keywordName: searchCategory, keyword: searchTerm });
    emitSearch();
    if (onSearch) onSearch(keywordOptions);
  };

  return (
    <search>
      <form className={cn('flex flex-col gap-2 sm:flex-row', className)} onSubmit={onSubmit}>
        {options && options.length ? (
          <Select value={searchCategory} onValueChange={setSearchCategory}>
            <SelectTrigger className="w-full sm:w-max sm:min-w-32">
              <SelectValue placeholder="검색 카테고리" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        <Input
          placeholder={placeholder || '검색어를 입력하세요'}
          name={name}
          className="flex-1 max-sm:h-max max-sm:py-2"
          {...props}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton />
      </form>
    </search>
  );
};

type FilterWrapperProps = React.ComponentProps<'div'>;
export const FilterWrapper = ({ className, children, ...props }: Readonly<FilterWrapperProps>) => {
  return (
    <div className="text-muted-foreground flex gap-2 text-sm" {...props}>
      <span className="mt-1 w-max whitespace-nowrap">필터:</span>
      <div className={cn('flex flex-1 flex-wrap items-center gap-2', className)}>{children}</div>
    </div>
  );
};

type FilterGroupProps = {
  value: string;
  setValue: (value: string) => void;
};
const FilterGroupContext = createContext<FilterGroupProps | null>(null);

const useFilterGroup = () => {
  const context = useContext(FilterGroupContext);
  if (!context) {
    throw new Error('FilterGroupContext is not found');
  }
  return context;
};

export const FilterGroup = ({
  children,
  onChange,
  initialValue,
}: Readonly<{ children: React.ReactNode; onChange?: (value: string) => void; initialValue?: string }>) => {
  const { onClear } = useSearchByQuery();
  const [value, setValue] = useState<string>(initialValue || '');

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value, onChange]);

  useEffect(() => {
    const cleanup = onClear(() => {
      setValue('');
    });
    return cleanup;
  }, [onClear]);

  return <FilterGroupContext.Provider value={{ value, setValue }}>{children}</FilterGroupContext.Provider>;
};

type FilterButtonProps = VariantProps<typeof buttonVariants> & {
  value: string;
  className?: string;
  children?: React.ReactNode;
};
export const FilterButton = ({ className, children, value, ...props }: Readonly<FilterButtonProps>) => {
  const { value: selectedValue, setValue: setGroupValue } = useFilterGroup();

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'data-[active=true]:bg-primary/10 data-[active=true]:border-primary/20 data-[active=true]:text-primary h-7 cursor-pointer px-2 text-xs',
        className,
      )}
      data-active={selectedValue === value}
      {...props}
      onClick={() => (selectedValue === value ? setGroupValue('') : setGroupValue(value))}
    >
      {children}
    </Button>
  );
};

export const FilterGroupSeperator = ({ className }: Readonly<{ className?: string }>) => {
  return (
    <Separator
      orientation="vertical"
      className={cn(
        'bg-foreground/20 data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px max-sm:data-[orientation=vertical]:h-px max-sm:data-[orientation=vertical]:w-full sm:mx-2',
        className,
      )}
    />
  );
};

type Option = {
  label: string;
  value: string;
};

type MultiValueFilterProps = {
  queryKey: string;
  options: Option[];
};

export const MultiValueFilter = ({ queryKey, options }: MultiValueFilterProps) => {
  const enumValues = options.map((opt) => opt.value);
  const [value, setValue] = useQueryState(queryKey);

  const { emitSearch } = useSearchByQuery();

  const handleChange = (val: string) => {
    emitSearch();
    if (enumValues.includes(val)) {
      setValue(val);
    } else {
      setValue(null);
    }
  };

  return (
    <FilterGroup onChange={handleChange} initialValue={value || undefined}>
      {options.map((option) => (
        <FilterButton key={option.value} value={option.value}>
          {option.label}
        </FilterButton>
      ))}
    </FilterGroup>
  );
};

type ComboboxFilterProps = {
  queryKey: string;
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  scope?: string; // 스코프 추가
};

export const ComboboxFilter = ({
  queryKey,
  options,
  placeholder = '선택하세요',
  searchPlaceholder = '검색...',
  emptyText = '결과가 없습니다',
  className,
  scope,
}: ComboboxFilterProps) => {
  const [value, setValue] = useQueryState(queryKey);
  const [open, setOpen] = useState(false);
  const { onClear, onClearScoped } = useSearchByQuery();

  useEffect(() => {
    const cleanup = onClear(() => {
      setValue(null);
    });
    return cleanup;
  }, [onClear, setValue]);

  useEffect(() => {
    if (!scope) return;
    const cleanup = onClearScoped(scope, () => {
      setValue(null);
    });
    return cleanup;
  }, [onClearScoped, scope, setValue]);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (currentValue: string) => {
    if (currentValue === value) {
      setValue(null);
    } else {
      setValue(currentValue === 'all' ? null : currentValue);
    }
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('min-w-[200px] justify-between', className)}
        >
          <span className="truncate">{selectedOption ? `${placeholder} | ${selectedOption.label}` : placeholder}</span>
          <div className="ml-2 flex items-center gap-1">
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.value} onSelect={handleSelect}>
                  <Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const FilterResetButton = ({ className, scope }: { className?: string; scope?: string }) => {
  const { clear, clearScoped } = useSearchByQuery();

  const handleClick = () => {
    if (scope) {
      clearScoped(scope);
    } else {
      clear();
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} className={cn('h-8 text-xs', className)}>
      <X className="mr-1 h-3.5 w-3.5" />
      필터 초기화
    </Button>
  );
};
