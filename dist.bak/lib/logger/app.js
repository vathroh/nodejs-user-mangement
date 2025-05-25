"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerHandling = void 0;
const logger_1 = __importDefault(require("../../logger"));
const loggerHandling = (req, res, next) => {
    res.on("finish", () => {
        logger_1.default.info(`METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
    next();
};
exports.loggerHandling = loggerHandling;
//# sourceMappingURL=app.js.map