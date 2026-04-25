import type { Shares } from '../../../generated/prisma/client';
import { prisma } from '../../lib/prisma';
import type { ShareCreateParameter } from '../../types/db';

// http://domain/shares/token
export const createShare = async ({ resourceId, expiresAt }: ShareCreateParameter) => {
  return prisma.shares.create({
    data: { resourceId, expiresAt },
    select: { token: true, expiresAt: true },
  });
};

export const getShare = async (token: Shares['token']) => {
  return prisma.shares.findUnique({
    where: { token },
  });
};
