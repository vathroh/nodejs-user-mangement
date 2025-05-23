import ExpressApplication from "./bootstrapper";
import { env } from "./config";
import express from "express";
import logger from "./logger";
import dotenv from "dotenv";
import "reflect-metadata";
import UserController from "./api/user/user.controller";

dotenv.config({ path: `${process.cwd()}/.env` });

const app = new ExpressApplication(
  env.PORT,
  [
    express.json({ limit: "10kb" }),
    express.urlencoded({ extended: true, limit: "10kb" }),
  ],
  [UserController]
);

const server = app.start();

logger.info(env.NODE_ENV);

process.on("SIGTERM", () => {
  logger.warn("SIGTERM RECEIVED!");
  server.close(() => {
    logger.warn("Process terminated!");
  });
});
