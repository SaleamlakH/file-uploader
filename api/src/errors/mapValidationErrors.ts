import type { FieldValidationError, ValidationError } from 'express-validator';

export const mapValidationErrors = (errors: ValidationError[]) => {
  return (errors as FieldValidationError[]).reduce(
    (acc, err) => {
      acc[err.path] = {
        message: err.msg,
        value: err.value,
      };
      return acc;
    },
    {} as Record<string, { message: string; value: unknown }>,
  );
};
