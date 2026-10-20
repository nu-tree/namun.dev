'use client';

import { cn } from '@/lib/utils/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { createContext, useContext } from 'react';

const DetailPageContext = createContext<{ listPageLink: string } | null>(null);
const useDetailPageContext = () => {
  const context = useContext(DetailPageContext);
  if (!context) {
    throw new Error('DetailPageContext is not found');
  }
  return context;
};

type Props = React.HTMLAttributes<HTMLElement>;
export const DetailPageWrapper = ({
  className,
  children,
  listPageLink,
  ...props
}: Readonly<Props & { listPageLink: string }>) => {
  return (
    <DetailPageContext.Provider value={{ listPageLink: listPageLink }}>
      <section className={cn('flex flex-col gap-y-6', className)} {...props}>
        {children}
      </section>
    </DetailPageContext.Provider>
  );
};

export const DetailPageHeader = ({ className, children, ...props }: Readonly<Props>) => {
  const { listPageLink } = useDetailPageContext();
  return (
    <div className={cn('flex items-center gap-4', className)} {...props}>
      <Link className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))} href={listPageLink}>
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <h1 className="text-3xl font-bold tracking-tight">{children}</h1>
    </div>
  );
};

export const DetailPageBackButton = ({ className, children, ...props }: Readonly<Props>) => {
  const { listPageLink } = useDetailPageContext();
  return (
    <div className={cn('flex justify-end', className)} {...props}>
      <Link className={cn(buttonVariants({ variant: 'outline' }), className)} href={listPageLink} {...props}>
        {children || '목록으로 돌아가기'}
      </Link>
    </div>
  );
};
