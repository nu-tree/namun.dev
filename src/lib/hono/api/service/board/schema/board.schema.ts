import { BoardRole } from '@/constants/board-role';
import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';
import { z } from 'zod';
/** 게시판 권한 enum */
export const BoardRoleEnum = z.enum(BoardRole);
export type BoardRoleEnum = z.infer<typeof BoardRoleEnum>;

/** 게시판 권한 설정 스키마 */
export const BoardFeatureSchema = z.object({
  role: z.object({
    edit: BoardRoleEnum,
    read: BoardRoleEnum,
    delete: BoardRoleEnum,
    comment: BoardRoleEnum,
  }),
  attachment: z
    .object({
      maxCount: z.number(),
      maxSize: z.number(),
      allowTypes: z.array(z.string()),
    })
    .optional(),
  comment: z
    .object({
      maxDepth: z.number(),
    })
    .optional(),
  secret: z
    .object({
      passwordRequired: z.boolean(),
    })
    .optional(),
  captcha: z.boolean().optional(),
  thumbnail: z
    .object({
      width: z.number(),
      height: z.number(),
    })
    .optional(),
});
export type BoardFeatureSchema = z.infer<typeof BoardFeatureSchema>;

/** 게시판 기본 스키마 */
export const BoardSchema = ItemCoreSchema.extend({
  deletedAt: z.date().nullable().optional(),
  slug: z.string(),
  title: z.string(),
  feature: BoardFeatureSchema,
});
export type BoardSchema = z.infer<typeof BoardSchema>;
