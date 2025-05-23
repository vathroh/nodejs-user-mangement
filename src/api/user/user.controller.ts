import { Request, Response } from "express";
import Controller from "../../decorators/routeDecorators/controller.decorator";
import { Get } from "../../decorators/routeDecorators/handler.decorator";
import UserService from "./user.service";
import testMiddlware from "../../middlewares";

@Controller("/api/users")
export default class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  @Get("", [testMiddlware("user")])
  public async getUsers(req: Request, res: Response) {
    return this.userService.getUser(req, res);
  }
}
