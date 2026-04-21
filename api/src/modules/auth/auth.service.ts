import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';

export const createUserWithDefaultFolder = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.users.create({
    include: {
      folders: true,
    },

    data: { email, password: hashedPassword, folders: { create: [{ folder: 'Default Folder' }] } },
  });
};
