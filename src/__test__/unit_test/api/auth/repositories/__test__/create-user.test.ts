import createUser from "@api/auth/repositories/create-user";
import { pool } from "@root/database/pool";
import bcrypt from "bcrypt";
import getUserByEmailSql from "@api/auth/repositories/sql/get-user-by-email";

jest.mock("@root/database/pool", () => ({
  pool: {
    query: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashedPassword"),
}));

jest.mock(
  "@api/auth/repositories/sql/get-user-by-email",
  () => "SELECT * FROM users WHERE email = $1"
);

describe("createUser", () => {
  const email = "test@example.com";
  const password = "password123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user and return the user data", async () => {
    // Arrange
    const mockQueryResult = { rows: [{ id: 1, email: email }] };
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

    // Act
    const result = await createUser(email, password);

    // Assert
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
      [email, "hashedPassword"]
    );
    expect(pool.query).toHaveBeenCalledWith(getUserByEmailSql, [email]);
    expect(result).toEqual(mockQueryResult);
  });

  it("should throw an error if user creation fails", async () => {
    // Arrange
    (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

    // Act & Assert
    await expect(createUser(email, password)).rejects.toThrow("Database error");
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
  });
});
