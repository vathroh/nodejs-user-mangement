import registerDto from "@api/auth/services/dto/register-dto";

describe("registerDto", () => {
  it("should validate a valid register DTO", () => {
    const validDto = {
      email: "test@example.com",
      password: "Password123!",
      confirm_password: "Password123!",
      phone_number: "1234567890",
      auth_provider_code: "auth.email",
      role_code: "role.customer",
    };
    const result = registerDto.safeParse(validDto);
    expect(result.success).toBe(true);
  });

  it("should invalidate an invalid email", () => {
    const invalidDto = {
      email: "invalid-email",
      password: "Password123!",
      confirm_password: "Password123!",
      phone_number: "1234567890",
      auth_provider_code: "auth.email",
      role_code: "role.customer",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password with less than 8 characters", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "Pass1!",
      confirm_password: "Pass1!",
      phone_number: "1234567890",
      auth_provider_code: "auth.email",
      role_code: "role.customer",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password without a lowercase character", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "PASSWORD123!",
      confirm_password: "PASSWORD123!",
      phone_number: "1234567890",
      auth_provider_code: "auth.email",
      role_code: "role.customer",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password without an uppercase character", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "password123!",
      confirm_password: "password123!",
      phone_number: "1234567890",
      auth_provider_code: "auth.email",
      role_code: "role.customer",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password without a number", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "Password!",
      confirm_password: "Password!",
      phone_number: "1234567890",
      auth_provider_code: "auth.email",
      role_code: "role.customer",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });

  it("should invalidate a password without a special character", () => {
    const invalidDto = {
      email: "test@example.com",
      password: "Password123",
      confirm_password: "Password123",
      phone_number: "1234567890",
      auth_provider_code: "auth.email",
      role_code: "role.customer",
    };
    const result = registerDto.safeParse(invalidDto);
    expect(result.success).toBe(false);
  });
});
