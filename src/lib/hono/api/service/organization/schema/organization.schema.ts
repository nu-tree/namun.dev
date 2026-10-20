import { ItemCoreSchema, PaginationSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';

/** 조직 기본 스키마 */
export const OrganizationSchema = ItemCoreSchema.extend({
  name: z.string(),
  slug: z.string(),
  logo: z.string().nullable(),
  metadata: z.string().nullable(),
});

export type OrganizationSchema = z.infer<typeof OrganizationSchema>;
