import { prisma } from '@/lib/setting/prisma/prisma.server';
import { SiteSettingKeyType } from '@/lib/hono/api/service/site-setting/schema/site-setting.schema';

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany();
  return settings;
}

export async function getSiteSettingByKey(key: SiteSettingKeyType) {
  const setting = await prisma.siteSetting.findUnique({
    where: { key },
  });
  return setting;
}

export function getSiteSettingValue(settings: Awaited<ReturnType<typeof getSiteSettings>>, key: SiteSettingKeyType) {
  return settings.find((s) => s.key === key)?.value || '';
}
