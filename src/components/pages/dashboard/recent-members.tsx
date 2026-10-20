'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoadingUi } from './common-ui/loading-ui';
import { useNewestUsers } from '@/hooks/api/metrics/use-newest-users';
import { format } from 'date-fns';

type Props = React.HTMLAttributes<HTMLElement>;

export const RecentMembers = ({ className }: Readonly<Props>) => {
  const { isLoading } = useNewestUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 가입 회원</CardTitle>
        <CardDescription>최근 가입한 회원 목록입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingUi className="size-8" />
            </div>
          ) : (
            <Chart />
          )}
        </div>

        <div className="mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/members">모든 회원 보기</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Chart = () => {
  const { data, isError } = useNewestUsers();

  const chartData = data
    ? data.map((item) => ({
        ...item,
        createdAt: format(new Date(item.createdAt), 'yyyy-MM-dd'),
      }))
    : [];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <span>문제가 발생했습니다</span>
        <span className="text-red-600">{'error'}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chartData.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Users className="size-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">
              {item.name} ({item.role})
            </p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
          <div className="text-xs text-muted-foreground">{item.createdAt}</div>
        </div>
      ))}
    </div>
  );
};
