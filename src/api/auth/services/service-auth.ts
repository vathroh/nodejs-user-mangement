import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import registerDto from "@api/auth/services/dto/register-dto";
import { ValidationError, DataUniqueError } from "@lib/errors/index";
import errorsToFlatString from "@lib/errors/format/format-to-string";
import { pool } from "@database/pool";
import { env } from "@root/config";
import { ApiResponse } from "@root/lib/response";
import getUserbyEmail from "../repositories/get-user-by-email";
import createUser from "../repositories/create-user";

/**
 * AuthService
 *
 * This service handles authentication-related operations, such as user registration and login.
 */
export default class AuthService {
  /**
   * register
   *
   * Registers a new user.
   * @param req The Express Request object.
   * @param res The Express Response object.
   * @returns A promise that resolves to the result of the registration operation.
   */
  public async register(req: Request, res: Response) {
    const validation = registerDto.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(
        errorsToFlatString(validation.error.flatten().fieldErrors)
      );
    }

    const { email, password, phone_number, auth_provider_code, role_code } =
      validation.data;

    const existingUser = await getUserbyEmail(email);
    if (existingUser.rows.length > 0) {
      throw new DataUniqueError("Email already in use.");
    }

    const user = await createUser(
      email,
      password,
      phone_number,
      auth_provider_code,
      role_code
    );

    return new ApiResponse()
      .setSystem({ success: true, message: "User registerd successfully." })
      .setMetadata({})
      .setData(user.rows[0])
      .send(res);
  }

  /**
   * login
   *
   * Handles user login requests.
   * @param req The Express Request object.
   * @param res The Express Response object.
   * @returns A promise that resolves to the result of the login operation.
   */
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result.rows[0];

      console.log("Provided password:", password);
      console.log("Hashed password:", user.password);
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", passwordMatch);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return new ApiResponse()
        .setSystem({ success: false, message: "Internal server error" })
        .setMetadata({})
        .send(res);
    }
  }
}
