import { NextFunction, Request, Response } from "express";
import logger from "../../logger";

export const loggerHandling = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", () => {
    logger.info(
      `METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
};
