import { cn } from '@/lib/utils/utils';

type Props = {
  className?: string;
  children?: React.ReactNode;
  maxColSize?: string;
  gap?: string;
  maxColCount?: string;
  gridAutoType?: 'auto-fit' | 'auto-fill';
};

export const AutoColumnGrid = ({
  className,
  children,
  maxColSize,
  gap,
  maxColCount,
  gridAutoType,
}: Readonly<Props>) => {
  return (
    <article
      className={cn('grid-auto-columns', className)}
      style={
        {
          '--grid-max-col-size': maxColSize ?? '100%',
          '--grid-gap': gap ?? '0rem',
          '--grid-max-col-count': maxColCount ?? '1',
          '--grid-auto-type': gridAutoType ?? 'auto-fit',
        } as React.CSSProperties
      }
    >
      {children}
    </article>
  );
};
