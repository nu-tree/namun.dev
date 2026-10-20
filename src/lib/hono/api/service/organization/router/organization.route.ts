import { createHonoApp } from '@/lib/hono/core';
import {
  getActiveOrganization,
  getOrganizations,
  getOrganizationMembers,
  getOrganizationById,
  createOrganization,
  addOrganizationMember,
  updateOrganization,
  deleteOrganization,
  deleteOrganizations,
  removeOrganizationMember,
  removeOrganizationMembers,
} from '@/lib/hono/api/service/organization/service/organization.service';

export const organizationRouter = createHonoApp()
  .get('/active/:id', ...getActiveOrganization)
  .get('/', ...getOrganizations)
  .get('/members', ...getOrganizationMembers)
  .get('/:id', ...getOrganizationById)
  .post('/create', ...createOrganization)
  .post('/member/add', ...addOrganizationMember)
  .put('/update/:id', ...updateOrganization)
  .delete('/delete/:id', ...deleteOrganization)
  .post('/delete', ...deleteOrganizations)
  .delete('/member/remove/:id', ...removeOrganizationMember)
  .post('/member/remove', ...removeOrganizationMembers);
