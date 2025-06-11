import { pool } from "@root/database/pool";

const getUserbyId = async (id: string) => {
  return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
};

export default getUserbyId;
