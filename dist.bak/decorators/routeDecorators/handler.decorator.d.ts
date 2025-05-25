import { RequestHandler } from "express";
export declare enum Methods {
    Get = "get",
    post = "post",
    PUT = "put",
    DELETE = "delete"
}
export interface IRouter {
    method: Methods;
    middlewares?: RequestHandler[];
    handlerPath: string;
    handlerName: string | symbol;
}
export declare const Get: (path: string, middlewares: RequestHandler[]) => MethodDecorator;
export declare const Post: (path: string, middlewares: RequestHandler[]) => MethodDecorator;
export declare const Put: (path: string, middlewares: RequestHandler[]) => MethodDecorator;
export declare const Delete: (path: string, middlewares: RequestHandler[]) => MethodDecorator;
