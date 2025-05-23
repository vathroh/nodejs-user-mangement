import express, { Application, Handler, RequestHandler } from "express";
import path from "path";
import { env } from "./config";
import morgan from "morgan";
import logger from "./logger";
import MetadataKeys from "./types/metadata-keys";
import { IRouter } from "./decorators/routeDecorators/handler.decorator";

class ExpressApplication {
  private app: Application;

  constructor(
    private port: string | number,
    private middlewares: RequestHandler[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private controllers: any[]
  ) {
    this.app = express();

    this.setupMiddlewares(middlewares);
    this.setupRoutes(controllers);
    this.configureAssets();
    this.setupLogger();
  }

  private setupMiddlewares(middlewaresArr: RequestHandler[]) {
    middlewaresArr.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setupRoutes(controllers: any[]) {
    const info: Array<{ api: string; handler: string }> = [];

    controllers.forEach((Controller) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new Controller();

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

  private setupLogger() {
    if (env.NODE_ENV === "development") {
      this.app.use(morgan("dev"));
    }
  }

  public start() {
    return this.app.listen(this.port, () => {
      logger.info(`This application is running on port ${this.port}`);
    });
  }
}

export default ExpressApplication;
