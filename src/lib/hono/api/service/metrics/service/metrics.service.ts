import { apiSuccess, createRouteHandler } from '@/lib/hono/core';
import { prisma } from '@/lib/setting/prisma/prisma.server';
import { Prisma } from '@prisma-client/client';
import { addDays, isSameDay, subDays } from 'date-fns';
import { UAParser } from 'ua-parser-js';
import { decrypt } from '@/lib/auth/crypto-utils.server';

/** 메트릭 날짜 계산 헬퍼 */
const getMetricDates = (startDate: Date = subDays(new Date(), 6), endDate: Date = addDays(new Date(), 1)) => {
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return {
    dates,
    startDate,
    endDate,
  };
};

/** 디바이스 타입 감지 헬퍼 */
const detectDeviceType = (userAgent?: string) => {
  const parser = new UAParser(userAgent || '');
  const deviceType = parser.getDevice().type;

  switch (deviceType) {
    case 'mobile':
      return 'mobile';
    case 'tablet':
      return 'tablet';
    case undefined:
      return 'desktop';
    default:
      return 'others';
  }
};

/** 일일 방문자 조회 */
export const getDailyVisitor = createRouteHandler(async (c) => {
  const { startDate, endDate, dates } = getMetricDates();

  const dailyUniqueUsers = await prisma.$queryRaw<
    {
      date: Date;
      totalSessions: bigint;
      uniqueUsers: bigint;
    }[]
  >(Prisma.sql`SELECT
    DATE("created_at") as date,
    COUNT(*) as "totalSessions",
    COUNT(DISTINCT user_id) as "uniqueUsers"
  FROM "session"
  WHERE "created_at" >= ${startDate} AND "created_at" <= ${endDate}
  GROUP BY DATE("created_at")
  ORDER BY date`);

  const data = dates.map((metricDate) => {
    const dailyUniqueUser = dailyUniqueUsers.find(({ date }) => (date ? isSameDay(date, metricDate) : false));
    return {
      date: metricDate,
      uniqueUsers: Number(dailyUniqueUser?.uniqueUsers || 0),
      totalSessions: Number(dailyUniqueUser?.totalSessions || 0),
    };
  });

  return apiSuccess(c, data);
});

/** 일일 신규 사용자 조회 */
export const getDailyNewUser = createRouteHandler(async (c) => {
  const { startDate, endDate, dates } = getMetricDates();

  const dailyNewUsers = await prisma.$queryRaw<
    {
      date: Date;
      signupCount: bigint;
    }[]
  >(Prisma.sql`SELECT
    DATE("created_at") as date,
    COUNT(*) as "signupCount"
  FROM "user"
  WHERE "created_at" >= ${startDate} AND "created_at" <= ${endDate}
  GROUP BY DATE("created_at")
  ORDER BY date`);

  const data = dates.map((metricDate) => {
    const dailyNewUser = dailyNewUsers.find(({ date }) => (date ? isSameDay(date, metricDate) : false));
    return {
      date: metricDate,
      signupCount: Number(dailyNewUser?.signupCount || 0),
    };
  });

  return apiSuccess(c, data);
});

/** 디바이스별 사용자 통계 조회 */
export const getTopUserDevice = createRouteHandler(async (c) => {
  const { startDate, endDate } = getMetricDates();

  const sessions = await prisma.session.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      userAgent: true,
    },
  });

  const data = sessions.reduce(
    (acc, session) => {
      const deviceType = detectDeviceType(session.userAgent || '');
      acc[deviceType] = (acc[deviceType] || 0) + 1;
      return acc;
    },
    {} as Record<ReturnType<typeof detectDeviceType>, number>,
  );

  return apiSuccess(c, data);
});

/** 최신 사용자 목록 조회 */
export const getNewestUsers = createRouteHandler(async (c) => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      createdAt: true,
      role: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  return apiSuccess(c, users);
});
