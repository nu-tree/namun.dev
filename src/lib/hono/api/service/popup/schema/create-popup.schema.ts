import z from 'zod';
import { PopupSchema } from './popup-schema';

export const CreatePopupSchema = PopupSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreatePopupSchema = z.infer<typeof CreatePopupSchema>;
