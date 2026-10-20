import { z } from 'zod';

/** 메트릭 일일 방문자 응답 */
export const DailyVisitorSchema = z.object({
  date: z.date(),
  uniqueUsers: z.number(),
  totalSessions: z.number(),
});

export type DailyVisitor = z.infer<typeof DailyVisitorSchema>;

/** 메트릭 일일 신규 사용자 응답 */
export const DailyNewUserSchema = z.object({
  date: z.date(),
  signupCount: z.number(),
});

export type DailyNewUser = z.infer<typeof DailyNewUserSchema>;

/** 메트릭 디바이스 타입 */
export const DeviceTypeSchema = z.enum(['mobile', 'tablet', 'desktop', 'others']);

export type DeviceType = z.infer<typeof DeviceTypeSchema>;

/** 메트릭 디바이스 통계 응답 */
export const TopUserDeviceSchema = z.record(DeviceTypeSchema, z.number());

export type TopUserDevice = z.infer<typeof TopUserDeviceSchema>;

/** 메트릭 최신 사용자 응답 */
export const NewestUserSchema = z.object({
  name: z.string().nullable(),
  email: z.string(),
  createdAt: z.date(),
  role: z.string(),
});

export type NewestUserSchema = z.infer<typeof NewestUserSchema>;
