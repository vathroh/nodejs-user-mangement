import { Request, Response } from "express";

/**
 * UserService
 *
 * This service handles user-related operations.
 */
export default class UserService {
  /**
   * getUser
   *
   * Retrieves a list of users.
   * @param req The Express Request object.
   * @param res The Express Response object.
   * @returns A promise that resolves to the result of the user retrieval operation.
   */
  public async getUser(req: Request, res: Response) {
    // const sql = `SELECT * FROM users`;
    return res.send("Get User Route");
  }
}
