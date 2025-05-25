import ExpressApplication from "./bootstrapper";
import { env } from "./config";
import express from "express";
import logger from "@root/logger";
import "reflect-metadata";
import UserController from "@api/user/user.controller";
import AuthController from "@root/api/auth/controllers/controller-auth";
import corsMiddleware from "@middlewares/cors";
import Migration from "./database/migrations";

const app = new ExpressApplication(
  env.PORT,
  [
    express.json({ limit: "10kb" }),
    express.urlencoded({ extended: true, limit: "10kb" }),
  ],
  [UserController, AuthController]
);

app.expressApp.use(corsMiddleware);

new Migration().up();

const server = app.start();

process.on("SIGTERM", () => {
  logger.warn("SIGTERM RECEIVED!");
  server.close(() => {
    logger.warn("Process terminated!");
  });
});
