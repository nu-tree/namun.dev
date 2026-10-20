import { getListResponseSchema, PaginationSearchSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';
import { InquiryMetaSchema } from './inquiry-meta.schema';

/** 문의 메타 목록 조회 req */
export const GetInquiryMetaListRequestSchema = PaginationSearchSchema;
export type GetInquiryMetaListRequestSchema = z.infer<typeof GetInquiryMetaListRequestSchema>;

/** 문의 메타 목록 조회 res */
export const GetInquiryMetaListResponseSchema = getListResponseSchema(InquiryMetaSchema);
export type GetInquiryMetaListResponseSchema = z.infer<typeof GetInquiryMetaListResponseSchema>;
