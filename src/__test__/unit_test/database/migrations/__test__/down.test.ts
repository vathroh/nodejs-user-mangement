import { down } from "@database/migrations/down";
import path from "path";
import { pool } from "@database/pool";
import loadSqlQueries from "@database/utils/load-sql-queries";

jest.mock("path");
jest.mock("@database/pool", () => ({
  pool: {
    query: jest.fn(),
  },
}));
jest.mock("@database/utils/load-sql-queries");

describe("down", () => {
  beforeEach(() => {
    (path.join as jest.Mock).mockReturnValue("/path/to/sql");
    (loadSqlQueries as jest.Mock).mockResolvedValue([
      { table: "table1" },
      { table: "table2" },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should drop tables and delete migrations", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: 1 }] });

    await down();

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM migrations WHERE migration = $1",
      ["table1"]
    );
    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM migrations WHERE migration = $1",
      ["table1"]
    );
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM migrations WHERE migration = $1",
      ["table2"]
    );
    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM migrations WHERE migration = $1",
      ["table2"]
    );
  });

  it("should skip dropping tables if they are not in the migrations table", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

    await down();

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM migrations WHERE migration = $1",
      ["table1"]
    );
    expect(pool.query).not.toHaveBeenCalledWith(
      "DELETE FROM migrations WHERE migration = $1",
      ["table1"]
    );
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM migrations WHERE migration = $1",
      ["table2"]
    );
    expect(pool.query).not.toHaveBeenCalledWith(
      "DELETE FROM migrations WHERE migration = $1",
      ["table2"]
    );
  });

  it("should handle errors during rollback", async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(down()).rejects.toThrow("Database error");
  });
});
