import { RecentMembers } from '@/components/pages/dashboard/recent-members';
import { DailyVisitor } from '@/components/pages/dashboard/daily-visitor';
import { VisitorAgent } from '@/components/pages/dashboard/visitor-agent';
import { DailyNewUser } from '@/components/pages/dashboard/daily-new-user';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 기존 상단 카드 부분은 그대로 유지 */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DailyVisitor />
        <DailyNewUser />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <VisitorAgent />
        <RecentMembers />
      </div>
    </div>
  );
}
