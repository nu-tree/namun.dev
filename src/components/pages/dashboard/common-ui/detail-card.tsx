'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { ReactNode } from 'react';

// 필드 타입 정의
type DetailFieldProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

// 섹션 타입 정의
type DetailSectionProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

// 상태 필드 타입 정의
type StatusFieldProps = {
  label: string;
  status: 'completed' | 'pending' | 'error';
  statusText: string;
  action?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  info?: string;
  className?: string;
};

// 메인 카드 타입 정의
type DetailCardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  error?: string | null;
};

// 개별 필드 컴포넌트
export const DetailField = ({ label, value, className }: DetailFieldProps) => {
  return (
    <div className={cn('space-y-1', className)}>
      <dt className="text-base text-muted-foreground">{label}</dt>
      <dd className="text-base text">{value || '-'}</dd>
    </div>
  );
};

// 상태 필드 컴포넌트
export const StatusField = ({ label, status, statusText, action, info, className }: StatusFieldProps) => {
  const statusVariant = {
    completed: 'default' as const,
    pending: 'secondary' as const,
    error: 'destructive' as const,
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <Badge variant={statusVariant[status]}>{statusText}</Badge>
          {info && <div className="text-sm text-muted-foreground">{info}</div>}
        </div>
        {action && (
          <Button type="button" variant="destructive" size="sm" onClick={action.onClick} disabled={action.disabled}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

// 필드 그리드 컴포넌트
export const DetailFieldGrid = ({
  children,
  columns = 2,
  className,
}: {
  children: ReactNode;
  columns?: number;
  className?: string;
}) => {
  return (
    <dl className={cn('grid gap-4', className)} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </dl>
  );
};

// 필드 리스트 컴포넌트 (세로 나열)
export const DetailFieldList = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <dl className={cn('space-y-4', className)}>{children}</dl>;
};

// 섹션 컴포넌트
export const DetailSection = ({ title, children, className }: DetailSectionProps) => {
  return (
    <div className={cn('space-y-4', className)}>
      {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
      {children}
    </div>
  );
};

// 구분선 컴포넌트
export const DetailSeparator = ({ className }: { className?: string }) => {
  return <Separator className={cn('my-6', className)} />;
};

// 메인 디테일 카드 컴포넌트
export const DetailCard = ({ title, children, className, loading = false, error }: DetailCardProps) => {
  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('border-destructive', className)}>
        <CardContent className="p-6">
          <div className="text-destructive text-center">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      {title && (
        <CardHeader className="">
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn('space-y-4', title ? 'pt-0' : 'pt-4')}>{children}</CardContent>
    </Card>
  );
};
