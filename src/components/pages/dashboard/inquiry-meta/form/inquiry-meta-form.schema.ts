import { CreateInquiryMetaSchema } from '@/lib/hono/api/service/inquiry-meta/schema/create-inquiry-meta.schema';
import { z } from 'zod';

export const InquiryMetaFormSchema = CreateInquiryMetaSchema;
export type InquiryMetaFormSchema = z.infer<typeof InquiryMetaFormSchema>;
