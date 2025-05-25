// src/config/env.ts
import DotenvFlow from "dotenv-flow";
import { z } from "zod";

DotenvFlow.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]),
  DB_HOST: z.string().default("host.docker.internal"),
  DB_PORT: z.string().default("5432"),
  DB_USER: z.string().default("fathur"),
  DB_PASSWORD: z.string().default("qwerty123"),
  DB_NAME: z.string().default("users_management"),
  JWT_SECRET: z.string().default("your-secret-key"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
