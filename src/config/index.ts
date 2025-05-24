import { Pool } from "pg";
import { env } from "./env";

export * from "./env";

const pool = new Pool({
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

export { pool };
