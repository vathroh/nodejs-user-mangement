import { pool } from "@database/pool";
import path from "path";
import loadSqlQueries from "@database/utils/load-sql-queries";

export async function up() {
  const sqlDir = path.join(__dirname, "../sql");

  try {
    const queries = await loadSqlQueries(sqlDir);

    for (const q of queries) {
      const result = await pool.query(
        "SELECT * FROM migrations WHERE migration = $1",
        [q.table]
      );
      if (result.rows.length > 0) {
        console.log(`Migration "${q.table}" already executed, skipping.`);
      } else {
        await pool.query(q.query);
        console.log(`${q.table} migration completed successfully!`);

        await pool.query(
          "INSERT INTO migrations (migration, batch) VALUES ($1, 1)",
          [q.table]
        );
      }
    }
  } catch (error) {
    console.error("❌ Error running migration up:", error);
    throw error;
  }
}
