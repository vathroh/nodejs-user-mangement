import path from "path";
import { pool } from "../pool";
import loadSqlQueries from "../utils/load-sql-queries";

export async function down() {
  try {
    const sqlDir = path.join(__dirname, "../sql");
    const queries = await loadSqlQueries(sqlDir);

    for (const q of queries) {
      const result = await pool.query(
        "SELECT * FROM migrations WHERE migration = $1",
        [q.table]
      );
      if (result.rows.length === 0) {
        console.log(`Drop table "${q.table}" already executed, skipping.`);
      } else {
        await pool.query(`DROP TABLE IF EXISTS ${q.table};`);
        console.log(`"Drop table ${q.table} completed successfully!`);

        await pool.query("DELETE FROM migrations WHERE migration = $1", [
          q.table,
        ]);
      }
    }
  } catch (error) {
    console.error("Error rollback.", error);
    throw error;
  }
}
