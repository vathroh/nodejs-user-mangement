"use strict";
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
module.exports = ValidationError;
//# sourceMappingURL=internal-server-error%20copy.js.map