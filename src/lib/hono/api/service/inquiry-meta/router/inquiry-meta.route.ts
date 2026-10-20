import { createHonoApp } from '@/lib/hono/core';
import {
  getInquiryMetaList,
  getInquiryMetaOne,
  createInquiryMeta,
  updateInquiryMeta,
  deleteInquiryMeta,
  deleteManyInquiryMeta,
  getInquiryMetaOneBySlug,
} from '../service/inquiry-meta.service';

export const inquiryMetaRouter = createHonoApp()
  .get('/', ...getInquiryMetaList)
  .get('/id/:id', ...getInquiryMetaOne)
  .get('/slug/:id', ...getInquiryMetaOneBySlug)
  .post('/create', ...createInquiryMeta)
  .put('/update/:id', ...updateInquiryMeta)
  .delete('/delete/:id', ...deleteInquiryMeta)
  .post('/delete', ...deleteManyInquiryMeta);
