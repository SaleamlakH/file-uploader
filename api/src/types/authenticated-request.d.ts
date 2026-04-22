import type { Request } from 'express';
import type { Users } from '../../generated/prisma/client';

export interface AuthenticatedRequest extends Request {
  user: Users;
}
