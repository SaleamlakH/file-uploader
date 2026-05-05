import type { Request } from 'express';
import type { Users } from '../../generated/prisma/client.js';

export interface AuthenticatedRequest extends Request {
  user: Users;
}
