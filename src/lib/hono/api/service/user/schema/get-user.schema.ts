import { z } from 'zod';
import { getListResponseSchema, PaginationSearchSchema } from '@/lib/hono/api/shared/schema';
import { UserRoleType, UserSchema } from './user.schema';

/** 관리자페이지 목록조회 req */
export const GetUserListRequestSchema = PaginationSearchSchema.extend({
  userRole: UserRoleType.optional(),
});
export type GetUserListRequestSchema = z.infer<typeof GetUserListRequestSchema>;

/** 관리자페이지 목록조회 res */
export const GetUserListResponseSchema = getListResponseSchema(UserSchema);
export type GetUserListResponseSchema = z.infer<typeof GetUserListResponseSchema>;
