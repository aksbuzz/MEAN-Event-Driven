export class CustomError extends Error {
  constructor(
    public message: string = '',
    public status: number = 500,
    public code: string | number = 'INTERNAL_ERROR',
    public data: Record<string, any> = {}
  ) {
    super();
  }
}

export class BadRequestError extends CustomError {
  constructor(data: Record<string, any>) {
    super(`Validation errors.`, 400, 'BAD_REQUEST', { fields: data });
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(url: string) {
    super(`Route ${url} does not exist.`, 404, 'ROUTE_NOT_FOUND');
  }
}

export class NotFoundError extends CustomError {
  constructor(name: string) {
    super(`${name} not found.`, 404, 'NOT_FOUND');
  }
}

export class NotAuthorizedError extends CustomError {
  constructor(message = 'Authentication token is invalid.') {
    super(message, 401, 'NOT_AUTHORIZED');
  }
}

export class ConflictError extends CustomError {
  constructor(name: string) {
    super(`${name} already exists.`, 409, 'CONFLICT');
  }
}
