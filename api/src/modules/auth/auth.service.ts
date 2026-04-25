import { prisma } from '../../lib/prisma';

export const createUserWithDefaultFolder = async (email: string, password: string) => {
  return prisma.users.create({
    include: {
      folders: { omit: { ownerId: true } },
    },

    data: { email, password, folders: { create: [{ name: 'Default Folder' }] } },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.users.findUnique({
    where: { email },
  });
};

export const getUserById = async (id: string) => {
  return prisma.users.findUnique({
    where: { id },
    omit: { password: true },
  });
};
