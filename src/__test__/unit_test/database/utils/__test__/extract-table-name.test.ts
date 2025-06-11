import extractTableNames from "@database/utils/extract-table-name";

describe("extractTableNames", () => {
  it("should extract table name from CREATE TABLE statement", () => {
    const sql = `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255));`;
    const tableName = extractTableNames(sql);
    expect(tableName).toBe("users");
  });

  it("should extract table name from CREATE TABLE IF NOT EXISTS statement", () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255));`;
    const tableName = extractTableNames(sql);
    expect(tableName).toBe("users");
  });

  it("should extract table name with schema", () => {
    const sql = `CREATE TABLE public.users (id SERIAL PRIMARY KEY, name VARCHAR(255));`;
    const tableName = extractTableNames(sql);
    expect(tableName).toBe("users");
  });

  it("should extract table name with quoted identifiers", () => {
    const sql = `CREATE TABLE "users" (id SERIAL PRIMARY KEY, name VARCHAR(255));`;
    const tableName = extractTableNames(sql);
    expect(tableName).toBe("users");
  });

  it("should extract table name with schema and quoted identifiers", () => {
    const sql = `CREATE TABLE "public"."users" (id SERIAL PRIMARY KEY, name VARCHAR(255));`;
    const tableName = extractTableNames(sql);
    expect(tableName).toBe("users");
  });

  it("should return undefined if no table name is found", () => {
    const sql = `SELECT * FROM users;`;
    const tableName = extractTableNames(sql);
    expect(tableName).toBe(undefined);
  });
});
