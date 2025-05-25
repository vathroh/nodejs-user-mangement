import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
export declare const registerValidation: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
