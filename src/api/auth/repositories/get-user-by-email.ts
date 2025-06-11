import { pool } from "@root/database/pool";
import getUserByEmailSql from "./sql/get-user-by-email";

const getUserbyEmail = async (email: string) => {
  try {
    return await pool.query(getUserByEmailSql, [email]);
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
};
export default getUserbyEmail;
