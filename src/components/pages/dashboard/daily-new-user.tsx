'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { LoadingUi } from './common-ui/loading-ui';
import { useDailyNewUser } from '@/hooks/api/metrics/use-daily-new-user';
import { format } from 'date-fns';

export const DailyNewUser = () => {
  const { isLoading } = useDailyNewUser();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center">
          <LineChart className="mr-2 h-5 w-5" />
          회원 가입 추이
        </CardTitle>
        <CardDescription>월별 신규 회원 가입 현황</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingUi className="size-8" />
            </div>
          ) : (
            <DailyNewUserChart />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// 회원 가입 추이 차트 컴포넌트
const DailyNewUserChart = () => {
  const { data } = useDailyNewUser();

  const chartData = data
    ? data.map(({ date, signupCount }) => ({
        name: format(new Date(date), 'yyyy-MM-dd'),
        ['회원수']: signupCount,
      }))
    : [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 10]} tickCount={10} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="회원수" stroke="#8884d8" activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
