import { Request, Response } from "express";
export default class AuthController {
    private userService;
    constructor();
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
