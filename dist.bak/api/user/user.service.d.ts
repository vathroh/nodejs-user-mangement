import { Request, Response } from "express";
export default class UserService {
    getUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
