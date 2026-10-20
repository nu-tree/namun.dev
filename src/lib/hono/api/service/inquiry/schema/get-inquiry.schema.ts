import { getListResponseSchema, PaginationSearchSchema } from '@/lib/hono/api/shared/schema';
import { InquiryReplySchema, InquirySchema } from './inquiry.schema';
import { z } from 'zod';

/** 문의 목록 조회 req */
export const GetInquiriesRequestSchema = PaginationSearchSchema.extend({
  inquiryMetaId: z.string().optional().nullable(),
  isAnswered: z.boolean().optional().nullable(),
});

export type GetInquiriesRequestSchema = z.infer<typeof GetInquiriesRequestSchema>;

/** 문의 목록 조회 res */
export const GetInquiriesResponseSchema = getListResponseSchema(
  InquirySchema.extend({
    inquiryMeta: z.object({
      title: z.string(),
    }),
  }),
);
export type GetInquiriesResponseSchema = z.infer<typeof GetInquiriesResponseSchema>;

/** 문의 단건 조회 res */
export const GetInquiryResponseSchema = InquirySchema.extend({
  inquiryMeta: z.object({
    title: z.string(),
  }),
  reply: InquiryReplySchema.nullable().optional(),
});
export type GetInquiryResponseSchema = z.infer<typeof GetInquiryResponseSchema>;
