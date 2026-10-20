import { createHonoApp } from '@/lib/hono/core';
import {
  createBoard,
  getBoardById,
  getBoardBySlug,
  getBoardList,
  updateBoard,
  deleteBoard,
  getAllBoardSlugs,
} from '@/lib/hono/api/service/board/service/board.service';

export const boardRouter = createHonoApp()
  .get('/', ...getBoardList)
  .get('/slugs', ...getAllBoardSlugs)
  .get('/id/:id', ...getBoardById)
  .get('/slug/:id', ...getBoardBySlug)
  .post('/create', ...createBoard)
  .put('/update/:id', ...updateBoard)
  .post('/delete', ...deleteBoard);
