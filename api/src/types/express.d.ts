import type { Prisma } from '../../generated/prisma/client';

declare global {
  namespace Express {
    interface User extends Prisma.UsersFieldRefs {}
  }
}
