import z from 'zod';
import { PopupSchema } from './popup-schema';

export const UpdatesPopupSchema = PopupSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UpdatesPopupSchema = z.infer<typeof UpdatesPopupSchema>;
