import getUserbyId from "@api/auth/repositories/get-user-by-id";
import { pool } from "@root/database/pool";

jest.mock("@root/database/pool", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("getUserbyId", () => {
  const id = "123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data if user exists", async () => {
    // Arrange
    const mockQueryResult = { rows: [{ id: id, email: "test@example.com" }] };
    (pool.query as jest.Mock).mockResolvedValue(mockQueryResult);

    // Act
    const result = await getUserbyId(id);

    // Assert
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    expect(result).toEqual(mockQueryResult);
  });

  it("should throw an error if getting user by id fails", async () => {
    // Arrange
    (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

    // Act & Assert
    await expect(getUserbyId(id)).rejects.toThrow("Database error");
  });
});
