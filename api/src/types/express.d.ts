import type { Users } from '../../generated/prisma/client';

declare global {
  namespace Express {
    interface User extends Users {}
  }
}
