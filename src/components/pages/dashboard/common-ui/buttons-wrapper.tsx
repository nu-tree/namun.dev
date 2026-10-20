'use client';

import { cn } from '@/lib/utils/utils';
import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import { useSearchByQuery } from './search-wrapper';

type ButtonsWrapperProps = React.ComponentProps<'div'>;

export const ButtonsWrapper = ({ className, children, ...props }: Readonly<ButtonsWrapperProps>) => {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
};

type ToAddPageButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { href: string };
export const ToAddPageButton = ({ className, children, href, ...props }: Readonly<ToAddPageButtonProps>) => {
  return (
    <Button asChild className={cn('', className)} {...props}>
      <Link href={href}>
        <PlusCircle className="mr-1 h-4 w-4" />
        {children}
      </Link>
    </Button>
  );
};

type ClearSearchParamsButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>;
export const ClearSearchParamsButton = ({
  className,
  children,
  onClick,
  ...props
}: Readonly<ClearSearchParamsButtonProps>) => {
  const router = useRouter();
  const pathname = usePathname();
  const { clear, onClear } = useSearchByQuery();

  const handleClearSearchParams: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) onClick(e);
    clear();
  };

  onClear(() => {
    router.push(pathname);
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('text-xs cursor-pointer', className)}
      {...props}
      onClick={handleClearSearchParams}
    >
      {children || '검색 초기화'}
    </Button>
  );
};

type SearchButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>;
export const SearchButton = ({ className, children, ...props }: Readonly<SearchButtonProps>) => {
  return (
    <Button type="submit" className={cn('cursor-pointer', className)} {...props}>
      <Search className="h-4 w-4 mr-2" />
      {children || '검색'}
    </Button>
  );
};
