import { Request, Response } from "express";
import Controller from "../../decorators/routeDecorators/controller.decorator";
import { Get } from "../../decorators/routeDecorators/handler.decorator";
import UserService from "./user.service";

/**
 * UserController
 *
 * This controller handles user-related requests.
 */
@Controller("/api/users")
export default class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * getUsers
   *
   * Retrieves a list of users.
   * @param req The Express Request object.
   * @param res The Express Response object.
   * @returns A promise that resolves to the result of the user retrieval operation.
   */
  @Get("", [])
  public async getUsers(req: Request, res: Response) {
    return this.userService.getUser(req, res);
  }
}
