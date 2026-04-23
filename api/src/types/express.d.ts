import type { Files, Folders, Users } from '../../generated/prisma/client';

declare global {
  namespace Express {
    interface User extends Users {}
    interface Request {
      folder: Omit<Folders, 'ownerId'> & { files: Omit<Files, 'url'>[] };
    }
  }
}
