import type { Files, Folders, Users } from '../../generated/prisma/client.js';

declare global {
  namespace Express {
    interface User extends Users {
      password?: string;
    }
    interface Request {
      folder: Omit<Folders, 'ownerId'> & { files?: Omit<Files, 'url'>[] };
    }
  }
}
