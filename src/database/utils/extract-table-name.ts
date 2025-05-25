function extractTableNames(sql: string): string {
  const regex =
    /CREATE\s+TABLE\s+(IF\s+NOT\s+EXISTS\s+)?("?([a-zA-Z0-9_]+)"?\.)?"?([a-zA-Z0-9_]+)"?\s*\(/gi;
  const matches = [...sql.matchAll(regex)];

  const result = matches.map((match) => match[4]);

  return result[0];
}

export default extractTableNames;
