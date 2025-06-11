import { pool } from "@root/database/pool";
import bcrypt from "bcrypt";
import getUserByEmailSql from "./sql/get-user-by-email";

const createUser = async (email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
      [email, hashedPassword]
    );
    console.log("User created with email:", email);

    return pool.query(getUserByEmailSql, [email]);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export default createUser;
