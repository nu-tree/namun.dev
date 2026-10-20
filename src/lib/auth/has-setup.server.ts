import 'server-only';
import { prisma } from '@/lib/setting/prisma/prisma.server';
import { OWNER_ORG_SLUG } from '@/lib/constants/site-setting-constants';

export const hasSetup = async () => {
  const result = await prisma.organization.count({
    where: { slug: OWNER_ORG_SLUG },
  });
  return result > 0;
};
