import { Request, Response } from "express";
import Controller from "@decorators/routeDecorators/controller.decorator";
import { Post } from "@decorators/routeDecorators/handler.decorator";
import UserService from "@api/auth/services/service-auth";

/**
 * AuthController
 *
 * This controller handles authentication-related requests, such as login and registration.
 */
@Controller("/api/auth")
export default class AuthController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * login
   *
   * Handles user login requests.
   * @param req The Express Request object.
   * @param res The Express Response object.
   * @returns A promise that resolves to the result of the login operation.
   */
  @Post("/login", [])
  public async login(req: Request, res: Response) {
    return this.userService.login(req, res);
  }

  /**
   * register
   *
   * Handles user registration requests.
   * @param req The Express Request object.
   * @param res The Express Response object.
   * @returns A promise that resolves to the result of the registration operation.
   */
  @Post("/register", [])
  public async register(req: Request, res: Response) {
    return await this.userService.register(req, res);
  }
}
