import type { ApiErrorResponse } from './types/api';

export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors: ApiErrorResponse) {
    super(message);
    this.status = status;
    this.errors = errors.error;
  }
}
