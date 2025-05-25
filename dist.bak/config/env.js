"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// src/config/env.ts
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
const zod_1 = require("zod");
dotenv_flow_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default("3000"),
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]),
    DB_HOST: zod_1.z.string().default("localhost"),
    DB_PORT: zod_1.z.string().default("5432"),
    DB_USER: zod_1.z.string().default("fathur"),
    DB_PASSWORD: zod_1.z.string().default("qwerty123"),
    DB_NAME: zod_1.z.string().default("users_management"),
    JWT_SECRET: zod_1.z.string().default("your-secret-key"),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map