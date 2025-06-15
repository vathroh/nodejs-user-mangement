import { z } from "zod";

export const registerDto = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .regex(/[a-z]/, { message: "Password harus mengandung huruf kecil" })
      .regex(/[A-Z]/, { message: "Password harus mengandung huruf kapital" })
      .regex(/[0-9]/, { message: "Password harus mengandung angka" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password harus mengandung karakter spesial",
      }),
    confirm_password: z.string(),
    phone_number: z.string().optional(),
    role_code: z.string(),
    auth_provider_code: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Password confirmation doesn't match.",
  });

export default registerDto;
