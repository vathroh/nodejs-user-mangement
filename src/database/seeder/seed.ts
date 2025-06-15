import { pool } from "@database/pool";
import path from "path";
import loadSqlQueries from "@database/utils/load-sql-queries";

export async function seed() {
  const sqlDir = path.join(__dirname, "./sql");

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS seeders(
        id SERIAL NOT NULL,
        seeder VARCHAR,
        batch INT NOT NULL,
        PRIMARY KEY(id)
      );
    `);

    const queries = await loadSqlQueries(sqlDir);

    for (const q of queries) {
      const result = await pool.query(
        "SELECT * FROM seeders WHERE seeder = $1",
        [q.table]
      );
      if (result.rows.length > 0) {
        console.log(`Seeding "${q.table}" already executed, skipping.`);
      } else {
        await pool.query(q.query);
        console.log(`${q.table} seed completed successfully!`);

        await pool.query("INSERT INTO seeders (seeder, batch) VALUES ($1, 1)", [
          q.table,
        ]);
      }
    }
  } catch (error) {
    console.error("❌ Error running seeder:", error);
    throw error;
  }
}
