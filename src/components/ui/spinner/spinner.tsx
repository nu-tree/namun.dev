import { cn } from '@/lib/utils/utils';
import { ReactNode } from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

export const Spinner = ({ className, children, ...props }: Readonly<Props>) => {
  return (
    <div className={cn('flex flex-col items-center justify-center h-full', className)} {...props}>
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
      <span className="text-gray-500">{children}</span>
    </div>
  );
};
