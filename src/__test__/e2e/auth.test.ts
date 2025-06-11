import request from "supertest";
import { app } from "../../../src/app";
import { pool } from "../../../src/database/pool";

describe("Auth E2E Tests", () => {
  beforeAll(async () => {
    // Run migrations before tests
    // You might need to adjust the path based on your project structure
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
  });

  afterAll(async () => {
    // Clean up the database after tests
    await pool.query("DROP TABLE IF EXISTS users");
  });

  it("should register a new user", async () => {
    const response = await request(app.expressApp)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "Password123!",
      });

    expect(response.status).toBe(200);
    expect(response.body.system.message).toBe("User registerd successfully.");

    // Check if the user was created in the database
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      "test@example.com",
    ]);
    expect(user.rows.length).toBe(1);
  });

  it("should login an existing user", async () => {
    // First, register the user
    await request(app.expressApp).post("/api/auth/register").send({
      email: "login@example.com",
      password: "Login123!",
    });

    const response = await request(app.expressApp)
      .post("/api/auth/login")
      .send({
        email: "login@example.com",
        password: "Login123!",
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(app.expressApp)
      .post("/api/auth/login")
      .send({
        email: "login@example.com",
        password: "wrongPassword",
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
