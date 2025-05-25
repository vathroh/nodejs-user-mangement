"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrapper_1 = __importDefault(require("./bootstrapper"));
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("@root/logger"));
require("reflect-metadata");
const user_controller_1 = __importDefault(require("./api/user/user.controller"));
const auth_1 = __importDefault(require("./api/auth/controllers/auth"));
const cors_1 = __importDefault(require("@middlewares/cors"));
const app = new bootstrapper_1.default(config_1.env.PORT, [
    express_1.default.json({ limit: "10kb" }),
    express_1.default.urlencoded({ extended: true, limit: "10kb" }),
], [user_controller_1.default, auth_1.default]);
app.expressApp.use(cors_1.default);
const server = app.start();
process.on("SIGTERM", () => {
    logger_1.default.warn("SIGTERM RECEIVED!");
    server.close(() => {
        logger_1.default.warn("Process terminated!");
    });
});
//# sourceMappingURL=app.js.map