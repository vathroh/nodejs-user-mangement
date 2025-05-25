import { NextFunction, Request, Response } from "express";
declare const testMiddlware: (role: string) => (_req: Request, _res: Response, next: NextFunction) => void;
export default testMiddlware;
