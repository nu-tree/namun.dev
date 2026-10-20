'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { LoadingUi } from './common-ui/loading-ui';
import { useTopUserDevice } from '@/hooks/api/metrics/use-top-user-device';

export const VisitorAgent = () => {
  const { isLoading } = useTopUserDevice();
  return (
    <Card>
      <CardHeader>
        <CardTitle>접속 기기 순위</CardTitle>
        <CardDescription>최근 일주일 간 접속한 기기의 순위입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingUi className="size-8" />
            </div>
          ) : (
            <Chart />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Chart = () => {
  const { data, isError } = useTopUserDevice();

  const chartData = Object.entries(data || {}).map(([deviceType, count]) => ({
    name: deviceType,
    count,
  }));

  if (isError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <span>문제가 발생했습니다</span>
        <span className="text-red-600">{'error'}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chartData.map(({ name, count }, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex-1">{name}</div>
          <div>{count[name as 'mobile' | 'tablet' | 'desktop' | 'others']}</div>
        </div>
      ))}
    </div>
  );
};
