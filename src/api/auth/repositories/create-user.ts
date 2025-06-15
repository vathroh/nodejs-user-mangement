import { pool } from "@root/database/pool";
import bcrypt from "bcrypt";
import getUserByEmailSql from "./sql/get-user-by-email";
import { v4 as uuidv4 } from "uuid";
import { registerSQL } from "./sql/register";

const createUser = async (
  email: string,
  password: string,
  phone_number: string | undefined,
  auth_provider_code: string,
  role_code: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    try {
      await pool.query("BEGIN");
      await pool.query(registerSQL(), [
        id,
        email,
        phone_number,
        hashedPassword,
      ]);
      await pool.query(
        `INSERT INTO users_to_auth_providers (user_id, auth_provider_code) VALUES ($1, $2)`,
        [id, auth_provider_code]
      );
      await pool.query(
        `INSERT INTO users_to_roles (user_id, role_code) VALUES ($1, $2)`,
        [id, role_code]
      );
      await pool.query("COMMIT");
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }

    return pool.query(getUserByEmailSql, [email]);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export default createUser;
