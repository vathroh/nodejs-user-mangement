import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int().nonnegative(),
  email: z.string().email().max(255),
  password_hash: z.string().max(255),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),

  updated_by: z.string().max(255).nullable().optional(),
  created_by: z.string().max(255).nullable().optional(),

  is_deleted: z.boolean().optional().default(false),
  deleted_at: z.coerce.date().nullable().optional(),
  deleted_by: z.string().max(255).nullable().optional(),

  created_src: z.string().max(255).nullable().optional(),
  updated_src: z.string().max(255).nullable().optional(),
  deleted_src: z.string().max(255).nullable().optional(),

  auth_provider_id: z.number().int().nullable().optional(),
  roles_id: z.number().int().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
