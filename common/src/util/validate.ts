import { ZodSchema } from 'zod';

export const validate = <T>(fields: T, schema: ZodSchema<T>) => {
  const errors: Record<string, string> = {};
  const result = schema.safeParse(fields);
  if (!result.success) {
    result.error.issues.forEach(issue => {
      errors[issue.path[0]] = issue.message;
    });
    return errors;
  }

  return null;
};
