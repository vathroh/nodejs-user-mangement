declare class ValidationError extends Error {
    statusCode: number;
    constructor(message: string, stack?: string);
}
