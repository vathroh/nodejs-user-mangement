import { Request, Response } from "express";
export default class UserController {
    private userService;
    constructor();
    getUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
