"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InternalServerError extends Error {
    constructor(message, stack = "") {
        super(message);
        this.statusCode = 500;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = InternalServerError;
//# sourceMappingURL=internal-server-error.js.map