"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const registerValidation = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: result.error.flatten().fieldErrors,
        });
    }
    req.body = result.data; // sudah bersih & valid
    next();
};
exports.registerValidation = registerValidation;
//# sourceMappingURL=register-validation.js.map