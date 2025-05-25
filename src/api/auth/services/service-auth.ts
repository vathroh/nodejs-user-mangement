import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import registerDto from "@api/auth/services/dto/register-dto";
import bcrypt from "bcrypt";
import ValidationError from "@lib/errors/validation-error";
import errorsToFlatString from "@lib/errors/format/format-to-string";
import { pool } from "@database/pool";
import { env } from "@root/config";

export default class AuthService {
  public async register(req: Request, res: Response) {
    const validation = registerDto.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(
        errorsToFlatString(validation.error.flatten().fieldErrors)
      );
    }

    const { email, password } = validation.data;

    try {
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      console.log("existingUser", existingUser);

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
        [email, hashedPassword]
      );

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result.rows[0];

      if (user.password_hash !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
