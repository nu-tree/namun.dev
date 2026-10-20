import { PrismaClient } from '@prisma-client/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.board.upsert({
    where: { slug: 'notice' },
    update: {},
    create: {
      slug: 'notice',
      title: '공지사항',
      feature: {
        role: {
          edit: 'admin',
          read: 'guest',
          delete: 'admin',
          comment: 'user',
        },
      } as any,
    },
  });

  await prisma.board.upsert({
    where: { slug: 'faq' },
    update: {},
    create: {
      slug: 'faq',
      title: 'FAQ',
      feature: {
        role: {
          edit: 'admin',
          read: 'guest',
          delete: 'admin',
          comment: 'user',
        },
      } as any,
    },
  });

  await prisma.board.upsert({
    where: { slug: 'event' },
    update: {},
    create: {
      slug: 'event',
      title: '이벤트',
      feature: {
        role: {
          edit: 'admin',
          read: 'guest',
          delete: 'admin',
          comment: 'user',
        },
      } as any,
    },
  });

  await prisma.inquiryMeta.upsert({
    where: { slug: 'inquiry' },
    update: {},
    create: {
      slug: 'inquiry',
      title: '문의',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
