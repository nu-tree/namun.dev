import { createHonoApp } from '@/lib/hono/core';
import { getComments, createComment, updateComment, deleteComments } from '../service/comment.service';

export const commentRouter = createHonoApp()
  .get('/', ...getComments)
  .post('/create', ...createComment)
  .put('/update/:id', ...updateComment)
  .post('/delete', ...deleteComments);
