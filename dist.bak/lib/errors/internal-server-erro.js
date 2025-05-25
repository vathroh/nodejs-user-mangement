"use strict";
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
module.exports = InternalServerError;
//# sourceMappingURL=internal-server-erro.js.map