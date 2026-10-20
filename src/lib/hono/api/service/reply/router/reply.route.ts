import { createHonoApp } from '@/lib/hono/core';
import { getReplyByInquiryId, createReply, updateReply, deleteReply } from '../service/reply.service';

export const replyRouter = createHonoApp()
  .get('/:id', ...getReplyByInquiryId)
  .post('/create', ...createReply)
  .put('/update/:id', ...updateReply)
  .delete('/:id', ...deleteReply);
