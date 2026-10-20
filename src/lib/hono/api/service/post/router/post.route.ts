import { createHonoApp } from '@/lib/hono/core';
import {
  getPostList,
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from '@/lib/hono/api/service/post/service/post.service';

export const postRouter = createHonoApp()
  .get('/', ...getPostList)
  .get('/id/:id', ...getPostById)
  .post('/create', ...createPost)
  .put('/update/:id', ...updatePost)
  .post('/delete', ...deletePost);
