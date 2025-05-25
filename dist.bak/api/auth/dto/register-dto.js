"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const registerDto = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Password minimal 8 karakter" })
        .regex(/[a-z]/, { message: "Password harus mengandung huruf kecil" })
        .regex(/[A-Z]/, { message: "Password harus mengandung huruf kapital" })
        .regex(/[0-9]/, { message: "Password harus mengandung angka" })
        .regex(/[^a-zA-Z0-9]/, {
        message: "Password harus mengandung karakter spesial",
    }),
});
exports.default = registerDto;
//# sourceMappingURL=register-dto.js.map