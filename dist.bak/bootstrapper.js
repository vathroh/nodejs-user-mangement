"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./logger"));
const metadata_keys_1 = __importDefault(require("./types/metadata-keys"));
const app_1 = require("./lib/logger/app");
const response_1 = require("./lib/response");
class ExpressApplication {
    get expressApp() {
        return this.app;
    }
    constructor(port, middlewares, controllers) {
        this.port = port;
        this.middlewares = middlewares;
        this.controllers = controllers;
        this.app = (0, express_1.default)();
        this.setupLogger();
        this.setupMiddlewares(middlewares);
        this.setupRoutes(controllers);
        this.configureAssets();
        this.setupNotFoundRoute();
        this.setupErrorHandling();
    }
    setupMiddlewares(middlewaresArr) {
        middlewaresArr.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    setupRoutes(controllers) {
        console.log("Setting up routes...");
        const info = [];
        controllers.forEach((Controller) => {
            const controllerInstance = new Controller();
            const basePath = Reflect.getMetadata(metadata_keys_1.default.BASE_PATH, Controller);
            const routers = Reflect.getMetadata(metadata_keys_1.default.ROUTERS, Controller);
            const expressRouter = express_1.default.Router();
            routers.forEach(({ method, handlerPath, middlewares, handlerName }) => {
                if (middlewares) {
                    expressRouter[method](handlerPath, ...middlewares, controllerInstance[String(handlerName)].bind(controllerInstance));
                }
                else {
                    expressRouter[method](handlerPath, controllerInstance[String(handlerName)].bind(controllerInstance));
                }
                info.push({
                    api: `${method.toLocaleLowerCase()} ${basePath + handlerPath}`,
                    handler: `${Controller.name}.${String(handlerName)}`,
                });
            });
            this.app.use(basePath, expressRouter);
        });
        console.table(info);
    }
    configureAssets() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
    }
    setupErrorHandling() {
        this.app.use((err, req, res, _next) => {
            void _next;
            const statusCode = err.statusCode || 500;
            const message = err.message || "Internal Server Error";
            new response_1.ApiResponse()
                .setSystem({})
                .setMetadata({})
                .setData(null)
                .setError(statusCode, message, "internal server error")
                .send(res);
        });
    }
    setupNotFoundRoute() {
        this.app.use((req, res) => {
            logger_1.default.warn(`Route not found: ${req.path}`);
            const data = { status: 404, message: "Route not found" };
            new response_1.ApiResponse().setSystem(data).setData(null).send(res);
        });
    }
    setupLogger() {
        this.app.use(app_1.loggerHandling);
    }
    start() {
        return this.app.listen(this.port, () => {
            logger_1.default.info(`This application is running on port ${this.port}`);
        });
    }
}
exports.default = ExpressApplication;
//# sourceMappingURL=bootstrapper.js.map