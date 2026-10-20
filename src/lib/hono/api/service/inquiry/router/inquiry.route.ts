import { createHonoApp } from '@/lib/hono/core';
import {
  createInquiry,
  deleteInquiryMany,
  getInquiryList,
  getInquiryOne,
  updateInquiry,
} from '../service/inquiry.service';

export const inquiryRouter = createHonoApp()
  .get('/', ...getInquiryList)
  .get('/:id', ...getInquiryOne)
  .post('/create', ...createInquiry)
  .put('/update/:id', ...updateInquiry)
  .post('/delete', ...deleteInquiryMany);
