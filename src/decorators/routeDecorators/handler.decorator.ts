import { RequestHandler } from "express";
import MetadataKeys from "../../types/metadata-keys";

export enum Methods {
  Get = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export interface IRouter {
  method: Methods;
  middlewares?: RequestHandler[];
  handlerPath: string;
  handlerName: string | symbol;
}

const decoratorFactory =
  (method: Methods) =>
  (path: string, middlewares: RequestHandler[]): MethodDecorator =>
  (target, propertyKey) => {
    const controllerClass = target.constructor;

    const routers: IRouter[] = Reflect.hasMetadata(
      MetadataKeys.ROUTERS,
      controllerClass
    )
      ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
      : [];

    routers.push({
      method,
      middlewares,
      handlerPath: path,
      handlerName: propertyKey,
    });

    Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
  };

export const Get = decoratorFactory(Methods.Get);
export const Post = decoratorFactory(Methods.POST);
export const Put = decoratorFactory(Methods.PUT);
export const Delete = decoratorFactory(Methods.DELETE);
