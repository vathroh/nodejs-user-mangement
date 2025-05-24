class InternalServerError extends Error {
  statusCode: number;
  constructor(message: string, stack = "") {
    super(message);
    this.statusCode = 500;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default InternalServerError;
