import getUserbyEmail from "@api/auth/repositories/get-user-by-email";
import { pool } from "@root/database/pool";
import getUserByEmailSql from "@api/auth/repositories/sql/get-user-by-email";

jest.mock("@root/database/pool", () => ({
  pool: {
    query: jest.fn(),
  },
}));

jest.mock(
  "@api/auth/repositories/sql/get-user-by-email",
  () => "SELECT * FROM users WHERE email = $1"
);

describe("getUserbyEmail", () => {
  const email = "test@example.com";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data if user exists", async () => {
    // Arrange
    const mockQueryResult = { rows: [{ id: 1, email: email }] };
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

    // Act
    const result = await getUserbyEmail(email);

    // Assert
    expect(pool.query).toHaveBeenCalledWith(getUserByEmailSql, [email]);
    expect(result).toEqual(mockQueryResult);
  });

  it("should throw an error if getting user by email fails", async () => {
    // Arrange
    (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

    // Act & Assert
    await expect(getUserbyEmail(email)).rejects.toThrow("Database error");
  });
});
