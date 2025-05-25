import extractTableNames from "./extract-table-name";
import fs from "fs";
import path from "path";
import { Query } from "pg";

interface SqlQuery {
  query: Query;
  table: string;
}

async function loadSqlQueries(folderPath: string): Promise<SqlQuery[]> {
  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".ts"));
  const queries: SqlQuery[] = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const module = await import(filePath);
    const query = module.default as Query;

    if (typeof query === "string") {
      const table = extractTableNames(query);
      queries.push({ query, table });
    }
  }

  return queries;
}

export default loadSqlQueries;
