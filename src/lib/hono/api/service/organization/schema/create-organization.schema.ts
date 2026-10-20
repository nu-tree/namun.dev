import { z } from 'zod';
import { OrganizationSchema } from './organization.schema';

/** 조직 생성 요청 */
export const CreateOrganizationSchema = OrganizationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  metadata: z.record(z.string(), z.any()).optional().nullable(),
});
export type CreateOrganizationSchema = z.infer<typeof CreateOrganizationSchema>;

/** 조직 수정 요청 */
export const UpdateOrganizationSchema = CreateOrganizationSchema;
export type UpdateOrganizationSchema = z.infer<typeof UpdateOrganizationSchema>;

/** 조직 멤버 추가 요청 */
export const AddOrganizationMemberSchema = z.object({
  organizationId: z.string(),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요'),
  phoneNumber: z.string().min(1, '전화번호를 입력해주세요'),
});

export type AddOrganizationMemberSchema = z.infer<typeof AddOrganizationMemberSchema>;
