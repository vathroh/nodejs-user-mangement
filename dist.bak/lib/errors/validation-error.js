"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(message, stack = "") {
        super(message);
        this.statusCode = 400;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ValidationError;
//# sourceMappingURL=validation-error.js.map