import { z } from 'zod';
import { InquirySchema } from './inquiry.schema';

/** 문의 생성 */
export const CreateInquirySchema = InquirySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateInquirySchema = z.infer<typeof CreateInquirySchema>;

/** 문의 수정 요청 */
export const UpdateInquirySchema = CreateInquirySchema.partial();
export type UpdateInquirySchema = z.infer<typeof UpdateInquirySchema>;
