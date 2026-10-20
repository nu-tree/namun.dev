import { createHonoApp } from '@/lib/hono/core';
import { deleteUser, getUserListHandler, getUserOneHandler, updateUserHandler } from '../service/user.service';

export const userRouter = createHonoApp()
  .get('/', ...getUserListHandler)
  .get('/admin/:id', ...getUserOneHandler)
  .put('/:id', ...updateUserHandler)
  .post('/delete', ...deleteUser);
