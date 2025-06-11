import { Request, Response } from "express";
import AuthController from "@api/auth/controllers/controller-auth";
import UserService from "@api/auth/services/service-auth";

// Mock the UserService
jest.mock("@api/auth/services/service-auth");

describe("AuthController", () => {
  let authController: AuthController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockUserService = new UserService() as jest.Mocked<UserService>;
    (UserService as jest.Mock<UserService>).mockImplementation(
      () => mockUserService
    );
    authController = new AuthController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should call userService.login with the request and response", async () => {
      // Arrange
      const expectedResult = { message: "Login successful" };
      (mockUserService.login as jest.Mock).mockImplementation(
        async (req: Request, res: Response) => {
          res.status(200).json(expectedResult);
        }
      );

      // Act
      await authController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockUserService.login).toHaveBeenCalledWith(
        mockRequest,
        mockResponse
      );
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe("register", () => {
    it("should call userService.register with the request and response", async () => {
      // Arrange
      const expectedResult = { message: "Registration successful" };
      (mockUserService.register as jest.Mock).mockImplementation(
        async (req: Request, res: Response) => {
          res.status(201).json(expectedResult);
        }
      );

      // Act
      await authController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockUserService.register).toHaveBeenCalledWith(
        mockRequest,
        mockResponse
      );
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });
});
