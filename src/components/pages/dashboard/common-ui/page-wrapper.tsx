import { cn } from '@/lib/utils/utils';
import { Card, CardContent } from '@/components/ui/card';

type PageWrapperProps = React.ComponentProps<'section'>;
export const PageWrapper = ({ className, children, ...props }: Readonly<PageWrapperProps>) => {
  return (
    <section className={cn('space-y-6', className)} {...props}>
      {children}
    </section>
  );
};

type PageWrapperHeaderProps = React.ComponentProps<'article'>;
export const PageWrapperHeader = ({ className, children, ...props }: Readonly<PageWrapperHeaderProps>) => {
  return (
    <article className={cn('flex items-center justify-between', className)} {...props}>
      {children}
    </article>
  );
};

type PageWrapperTitleProps = React.ComponentProps<'h1'>;
export const PageWrapperTitle = ({ className, children, ...props }: Readonly<PageWrapperTitleProps>) => {
  return (
    <h1 className={cn('text-3xl font-bold tracking-tight', className)} {...props}>
      {children}
    </h1>
  );
};

type PageContentWrapperProps = React.ComponentProps<'div'>;
export const PageContentWrapper = ({ className, children, ...props }: Readonly<PageContentWrapperProps>) => {
  return (
    <Card>
      <CardContent className={cn('px-6 flex flex-col gap-4', className)} {...props}>
        {children}
      </CardContent>
    </Card>
  );
};

type PageContentWrapperHeaderProps = React.ComponentProps<'article'>;
export const PageContentWrapperHeader = ({
  className,
  children,
  ...props
}: Readonly<PageContentWrapperHeaderProps>) => {
  return (
    <article className={cn('flex items-center justify-between mb-2', className)} {...props}>
      {children}
    </article>
  );
};

type PageContentWrapperTitleProps = React.ComponentProps<'h3'>;
export const PageContentWrapperTitle = ({ className, children, ...props }: Readonly<PageContentWrapperTitleProps>) => {
  return (
    <h3 className={cn('text-lg font-medium', className)} {...props}>
      {children}
    </h3>
  );
};

type PageContentWrapperDescriptionProps = React.ComponentProps<'p'>;
export const PageContentWrapperDescription = ({
  className,
  children,
  ...props
}: Readonly<PageContentWrapperDescriptionProps>) => {
  return (
    <p className={cn('text-sm font-base text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
};

type PageContentWrapperBodyProps = React.ComponentProps<'div'>;
export const PageContentWrapperBody = ({ className, children, ...props }: Readonly<PageContentWrapperBodyProps>) => {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {children}
    </div>
  );
};
