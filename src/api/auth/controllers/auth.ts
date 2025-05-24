import { Request, Response } from "express";
import Controller from "../../../decorators/routeDecorators/controller.decorator";
import { Post } from "../../../decorators/routeDecorators/handler.decorator";
import UserService from "../services/auth";

@Controller("/api/auth")
export default class AuthController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  @Post("/login", [])
  public async login(req: Request, res: Response) {
    return this.userService.login(req, res);
  }

  @Post("/register", [])
  public async register(req: Request, res: Response) {
    return this.userService.register(req, res);
  }
}
