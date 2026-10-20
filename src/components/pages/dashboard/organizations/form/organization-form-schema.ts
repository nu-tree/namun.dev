import { CreateOrganizationSchema } from '@/lib/hono/api/service/organization/schema/create-organization.schema';
import { z } from 'zod';

export const OrganizationFormSchema = CreateOrganizationSchema.extend({
  slug: z.string().regex(/^[A-Za-z0-9_]+$/, {
    message: '영문자, 숫자, 밑줄( _ )만 입력할 수 있습니다.',
  }),
});
export type OrganizationFormSchema = z.infer<typeof OrganizationFormSchema>;
