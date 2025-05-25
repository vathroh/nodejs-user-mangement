declare class InternalServerError extends Error {
    statusCode: number;
    constructor(message: string, stack?: string);
}
