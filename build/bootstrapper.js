"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
const metadata_keys_1 = __importDefault(require("./types/metadata-keys"));
class ExpressApplication {
    constructor(port, middlewares, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    controllers) {
        this.port = port;
        this.middlewares = middlewares;
        this.controllers = controllers;
        this.app = (0, express_1.default)();
        this.setupMiddlewares(middlewares);
        this.setupRoutes(controllers);
        this.configureAssets();
        this.setupLogger();
    }
    setupMiddlewares(middlewaresArr) {
        middlewaresArr.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setupRoutes(controllers) {
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
    setupLogger() {
        if (config_1.env.NODE_ENV === "development") {
            this.app.use((0, morgan_1.default)("dev"));
        }
    }
    start() {
        return this.app.listen(this.port, () => {
            logger_1.default.info(`This application is running on port ${this.port}`);
        });
    }
}
exports.default = ExpressApplication;
//# sourceMappingURL=bootstrapper.js.map