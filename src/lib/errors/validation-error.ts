class ValidationError extends Error {
  statusCode: number;
  constructor(message: string, stack = "") {
    super(message);
    this.statusCode = 400;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ValidationError;
