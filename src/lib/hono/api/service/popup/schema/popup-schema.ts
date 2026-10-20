import { z } from 'zod';
import { ItemCoreSchema } from '@/lib/hono/api/shared/schema';

export const PopupDisplayType = z.enum(['PC', 'MOBILE', 'ALL']);
export type PopupDisplayType = z.infer<typeof PopupDisplayType>;

export const PopupPositionType = z.enum([
  'TOP_LEFT',
  'TOP_CENTER',
  'TOP_RIGHT',
  'CENTER_LEFT',
  'CENTER',
  'CENTER_RIGHT',
]);
export type PopupPositionType = z.infer<typeof PopupPositionType>;

export const PopupSizeType = z.enum(['SMALL', 'MEDIUM', 'LARGE']);
export type PopupSizeType = z.infer<typeof PopupSizeType>;

export const PopupSchema = ItemCoreSchema.extend({
  identifier: z.string(),
  content: z.string(),
  linkUrl: z.string().nullable().optional(),
  displayOrder: z.number().optional(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  topPosition: z.number().nullable().optional(),
  leftPosition: z.number().nullable().optional(),
  positionType: PopupPositionType,
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  displayPages: z.string().nullable().optional(),
  displayType: PopupDisplayType,
  sizeType: PopupSizeType,
});

export type PopupSchema = z.infer<typeof PopupSchema>;
