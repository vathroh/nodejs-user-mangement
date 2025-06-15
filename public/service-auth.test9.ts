import { Request, Response } from "express";
import AuthService from "@api/auth/services/service-auth";
import { ValidationError, DataUniqueError } from "@lib/errors/index";
import { pool } from "@database/pool";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getUserbyEmail from "@api/auth/repositories/get-user-by-email";
import createUser from "@api/auth/repositories/create-user";
import registerDto from "@api/auth/services/dto/register-dto";
import { ApiResponse } from "@root/lib/response";

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mockedToken"),
}));
jest.mock("@api/auth/services/dto/register-dto", () => ({
  safeParse: jest.fn(),
}));
jest.mock("@api/auth/repositories/get-user-by-email");
jest.mock("@api/auth/repositories/create-user");
jest.mock("@database/pool", () => ({
  pool: {
    query: jest.fn(),
  },
}));
jest.mock("@root/lib/response", () => ({
  ApiResponse: jest.fn().mockImplementation(() => {
    return {
      setSystem: jest.fn().mockReturnThis(),
      setMetadata: jest.fn().mockReturnThis(),
      setData: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  }),
}));

describe("AuthService", () => {
  let authService: AuthService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    authService = new AuthService();
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      (registerDto.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: {
          email: "test@example.com",
          password: "password",
          role_code: "role.customer",
          auth_provider_code: "auth.email",
        },
      });
      (getUserbyEmail as jest.Mock).mockResolvedValue({ rows: [] });
      (createUser as jest.Mock).mockResolvedValue({
        rows: [{ id: 1, email: "test@example.com" }],
      });
      (createUser as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
          rows: [{ id: 1, email: "test@example.com" }],
        });
      });

      await authService.register(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(getUserbyEmail).toHaveBeenCalledWith("test@example.com");
      expect(createUser).toHaveBeenCalledWith("test@example.com", "password");
      expect(ApiResponse).toHaveBeenCalled();
    });

    it("should throw a validation error if the request body is invalid", async () => {
      (registerDto.safeParse as jest.Mock).mockReturnValue({
        success: false,
        error: {
          flatten: () => ({ fieldErrors: { email: ["Invalid email"] } }),
        },
      });

      await expect(
        authService.register(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow(ValidationError);
    });

    it("should throw a DataUniqueError if the email is already in use", async () => {
      (registerDto.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: { email: "test@example.com", password: "password" },
      });
      (getUserbyEmail as jest.Mock).mockResolvedValue({
        rows: [{ id: 1, email: "test@example.com" }],
      });

      await expect(
        authService.register(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow(DataUniqueError);
    });

    it("should throw an error if createUser fails", async () => {
      (registerDto.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: { email: "test@example.com", password: "password" },
      });
      (getUserbyEmail as jest.Mock).mockResolvedValue({ rows: [] });
      (createUser as jest.Mock).mockRejectedValue(
        new Error("Create user failed")
      );

      await expect(
        authService.register(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow("Create user failed");
    });
  });

  describe("login", () => {
    it("should login a user successfully", async () => {
      (mockRequest as Partial<Request>).body = {
        email: "test@example.com",
        password: "password",
      };
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [
          { id: 1, email: "test@example.com", password: "hashedPassword" },
        ],
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await authService.login(mockRequest as Request, mockResponse as Response);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["test@example.com"]
      );
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
      expect(jwt.sign).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({ token: "mockedToken" });
    });

    it("should return 401 if user not found", async () => {
      (mockRequest as Partial<Request>).body = {
        email: "test@example.com",
        password: "password",
      };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      await authService.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });

    it("should return 401 if password does not match", async () => {
      (mockRequest as Partial<Request>).body = {
        email: "test@example.com",
        password: "password",
      };
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [
          { id: 1, email: "test@example.com", password: "hashedPassword" },
        ],
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await authService.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });

    it("should return 500 if there is an internal server error", async () => {
      (mockRequest as Partial<Request>).body = {
        email: "test@example.com",
        password: "password",
      };
      (pool.query as jest.Mock).mockRejectedValue(
        new Error("Internal server error")
      );

      await authService.login(mockRequest as Request, mockResponse as Response);

      expect(ApiResponse).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });
});
