import { z } from 'zod';
import { InquiryMetaSchema } from './inquiry-meta.schema';

/** 문의 메타 생성 */
export const CreateInquiryMetaSchema = InquiryMetaSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateInquiryMetaSchema = z.infer<typeof CreateInquiryMetaSchema>;

/** 문의 메타 수정 */
export const UpdateInquiryMetaSchema = CreateInquiryMetaSchema.partial();
export type UpdateInquiryMetaSchema = z.infer<typeof UpdateInquiryMetaSchema>;
