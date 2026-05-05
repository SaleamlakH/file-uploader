import type { Shares } from '../../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import type { ShareCreateParameter } from '../../types/db.js';

// http://domain/shares/token
export const createShare = async ({ resourceId, expiresAt }: ShareCreateParameter) => {
  return prisma.shares.create({
    data: { resourceId, expiresAt },
    select: { token: true, expiresAt: true },
  });
};

export const getShare = async (token: Shares['token']) => {
  return prisma.shares.findUnique({
    where: { token, expiresAt: { gt: new Date() } },
  });
};
