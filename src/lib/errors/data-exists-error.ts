class DataUniqueError extends Error {
  statusCode: number;
  constructor(message: string, stack = "") {
    super(message);
    this.statusCode = 409;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default DataUniqueError;
