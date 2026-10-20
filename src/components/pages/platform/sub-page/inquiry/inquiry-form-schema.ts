import { CreateInquirySchema } from '@/lib/hono/api/service/inquiry/schema/create-inquiry.schema';
import { z } from 'zod';

export const InquiryFormSchema = CreateInquirySchema;
export type InquiryFormSchema = z.infer<typeof InquiryFormSchema>;
