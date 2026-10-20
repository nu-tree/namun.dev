import {
  getListResponseSchema,
  ItemCoreSchema,
  PaginationSchema,
  PaginationSearchSchema,
} from '@/lib/hono/api/shared/schema';
import { z } from 'zod';
import { OrganizationSchema } from './organization.schema';

/** 조직 목록 조회 req */
export const GetOrganizationsRequestSchema = PaginationSearchSchema;
export type GetOrganizationsRequestSchema = z.infer<typeof GetOrganizationsRequestSchema>;

/** 조직 목록 조회 res */
export const GetOrganizationsResponseSchema = getListResponseSchema(OrganizationSchema);
export type GetOrganizationsResponseSchema = z.infer<typeof GetOrganizationsResponseSchema>;

/** 조직 멤버 목록 조회 req */
export const GetOrganizationMembersRequestSchema = PaginationSchema.extend({
  organizationId: z.string(),
});

export type GetOrganizationMembersRequestSchema = z.infer<typeof GetOrganizationMembersRequestSchema>;

/** 조직 멤버 목록 조회 res */
export const MemberResponseSchema = ItemCoreSchema.extend({
  userId: z.string(),
  organizationId: z.string(),
  role: z.string(),
  user: z.object({
    email: z.string(),
    name: z.string().nullable(),
    phoneNumber: z.string().nullable(),
  }),
});
export type MemberResponseSchema = z.infer<typeof MemberResponseSchema>;

export const GetOrganizationMembersResponseSchema = getListResponseSchema(MemberResponseSchema);

export type GetOrganizationMembersResponseSchema = z.infer<typeof GetOrganizationMembersResponseSchema>;

/** 조직 단건 조회 res */
export const GetOrganizationResponseSchema = OrganizationSchema.extend({
  metadata: z.record(z.string(), z.any()).nullable(),
});
export type GetOrganizationResponseSchema = z.infer<typeof GetOrganizationResponseSchema>;

/** 활성 조직 조회 res */
export const GetActiveOrganizationResponseSchema = z.string().nullable();
export type GetActiveOrganizationResponseSchema = z.infer<typeof GetActiveOrganizationResponseSchema>;
