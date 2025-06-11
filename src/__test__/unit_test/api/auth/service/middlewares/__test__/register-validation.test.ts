import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { registerValidation } from "@api/auth/services/middlewares/register-validation";

describe("registerValidation", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockSchema: ZodSchema;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockSchema = {
      safeParse: jest.fn(),
    } as unknown as ZodSchema;
  });

  it("should call next if the schema is valid", () => {
    (mockSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: { email: "test@example.com", password: "password" },
    });
    const middleware = registerValidation(mockSchema);
    middleware(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it("should return a 400 error if the schema is invalid", () => {
    (mockSchema.safeParse as jest.Mock).mockReturnValue({
      success: false,
      error: {
        flatten: () => ({ fieldErrors: { email: ["Invalid email"] } }),
      },
    });
    const middleware = registerValidation(mockSchema);
    middleware(mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Validation error",
      errors: { email: ["Invalid email"] },
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
