'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LoadingUi } from './common-ui/loading-ui';
import { useDailyVisitor } from '@/hooks/api/metrics/use-daily-visitor';
import { format } from 'date-fns';

export const DailyVisitor = () => {
  const { isLoading } = useDailyVisitor();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          일별 방문자 수
        </CardTitle>
        <CardDescription>요일별 사이트 방문자 현황</CardDescription>
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
      </CardContent>
    </Card>
  );
};

const Chart = () => {
  const { data, isError } = useDailyVisitor();

  const chartData = data
    ? data.map(({ date, uniqueUsers, totalSessions }) => ({
        name: format(new Date(date), 'yyyy-MM-dd'),
        ['순방문자수']: uniqueUsers,
        ['방문자수']: totalSessions,
      }))
    : [];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center size-full">
        <span>문제가 발생했습니다</span>
        <span className="text-red-600">{'에러 발생'}</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="방문자수" fill="#82ca9d" />
        <Bar dataKey="순방문자수" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
