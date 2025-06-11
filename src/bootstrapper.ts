import express, {
  Application,
  Handler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import path from "path";
import logger from "./logger";
import MetadataKeys from "./types/metadata-keys";
import { IRouter } from "@decorators/routeDecorators/handler.decorator";
import { loggerHandling } from "@lib/logger/app";
import { ApiResponse, SystemData } from "@lib/response";
import ApiError from "@lib/errors/api-error";

export interface IControllerInstance {
  [key: string]: Handler;
}

export interface IControllerConstructor {
  new (): IControllerInstance;
}

class ExpressApplication {
  private app: Application;

  get expressApp(): Application {
    return this.app;
  }

  constructor(
    private port: string | number,
    private middlewares: RequestHandler[],
    private controllers: Array<new () => unknown>
  ) {
    this.app = express();

    this.setupLogger();
    this.setupMiddlewares(middlewares);
    this.setupRoutes(controllers);
    this.configureAssets();
    this.setupNotFoundRoute();
    this.setupErrorHandling();
  }

  private setupMiddlewares(middlewaresArr: RequestHandler[]) {
    middlewaresArr.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private setupRoutes(controllers: Array<new () => unknown>) {
    console.log("Setting up routes...");
    const info: Array<{ api: string; handler: string }> = [];

    controllers.forEach((Controller) => {
      const controllerInstance = new Controller() as Record<string, Handler>;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        Controller
      );

      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        Controller
      );

      const expressRouter = express.Router();

      routers.forEach(({ method, handlerPath, middlewares, handlerName }) => {
        if (middlewares) {
          expressRouter[method](
            handlerPath,
            ...middlewares,
            controllerInstance[String(handlerName)].bind(controllerInstance)
          );
        } else {
          expressRouter[method](
            handlerPath,
            controllerInstance[String(handlerName)].bind(controllerInstance)
          );
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

  private configureAssets() {
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private setupErrorHandling() {
    this.app.use(
      (
        err: ApiError,
        req: Request,
        res: Response,
        _next: NextFunction
      ): void => {
        void _next;

        console.log("statusss :", err.statusCode);

        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";

        new ApiResponse()
          .setSystem({})
          .setMetadata({})
          .setData(null)
          .setError(statusCode, message, "internal server error")
          .send(res);
      }
    );
  }

  private setupNotFoundRoute() {
    this.app.use((req: Request, res: Response) => {
      logger.warn(`Route not found: ${req.path}`);
      const data: SystemData = { status: 404, message: "Route not found" };
      new ApiResponse().setSystem(data).setData(null).send(res);
    });
  }

  private setupLogger() {
    this.app.use(loggerHandling);
  }

  public start() {
    return this.app.listen(this.port, () => {
      logger.info(`This application is running on port ${this.port}`);
    });
  }
}

export default ExpressApplication;
