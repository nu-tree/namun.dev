'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
        <p className="text-muted-foreground">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        <Button asChild>
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  );
}
