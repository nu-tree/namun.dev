import { z } from 'zod';

// 단건/다중 조회를 위한 ID 스키마
export const IdSchema = z.string();
export const IdParamSchema = z.object({ id: IdSchema });
export type IdParamSchema = z.infer<typeof IdParamSchema>;
export const IdsQuerySchema = z.object({ ids: z.array(IdSchema) });
export type IdsQuerySchema = z.infer<typeof IdsQuerySchema>;
// 페이지네이션 스키마
export const PaginationSchema = z.object({
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});
// 검색 키워드 스키마
export const SearchKeywordSchema = z.object({
  keyword: z.string().optional(),
  keywordName: z.string().optional(),
});
// 페이지네이션 + 검색 키워드 스키마(목록 조회 req 스키마)
export const PaginationSearchSchema = PaginationSchema.extend(SearchKeywordSchema.shape);

// 아이템 공통 스키마
export const ItemCoreSchema = z.object({
  id: IdSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type ItemCoreSchema = z.infer<typeof ItemCoreSchema>;

// 목록 조회 res 스키마
export const getListResponseSchema = <T>(schema: z.ZodSchema<T>) =>
  z.object({
    data: z.array(schema),
    totalCounts: z.number(),
  });
