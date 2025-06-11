import registerDto from "@api/auth/services/dto/register-dto";

describe("registerDto", () => {
  it("should validate a valid register DTO", () => {
    const validDto = {
      email: "test@example.com",
      password: "Password123!",
    };
    const result = registerDto.safeParse(validDto);
    expect(result.success).toBe(true);
  });

  it("should invalidate an invalid email", () => {
    const invalidDto = {
      email: "invalid-email",
      password: "Password123!",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password with less than 8 characters", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "Pass1!",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password without a lowercase character", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "PASSWORD123!",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password without an uppercase character", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "password123!",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password without a number", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "Password!",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password without a special character", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "Password123",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });
});
