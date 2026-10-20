import { BoardRole } from '@/constants/board-role';
import { PrismaClient } from '@prisma-client/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

declare global {
  namespace PrismaJson {
    type BoardFeature = {
      role: {
        edit: BoardRole;
        read: BoardRole;
        delete: BoardRole;
        comment: BoardRole;
      };
      attachment?: {
        maxCount: number;
        maxSize: number;
        allowTypes: string[];
      };
      comment?: {
        maxDepth: number;
      };
      secret?: {
        passwordRequired: boolean;
      };
      captcha?: boolean;
      thumbnail?: {
        width: number;
        height: number;
      };
    };
  }
}
