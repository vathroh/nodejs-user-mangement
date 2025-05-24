import { Request, Response } from "express";

export default class UserService {
  public async getUser(req: Request, res: Response) {
    // const sql = `SELECT * FROM users`;
    return res.send("Get User Route");
  }
}
