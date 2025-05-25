import { Application, Handler, RequestHandler } from "express";
export interface IControllerInstance {
    [key: string]: Handler;
}
export interface IControllerConstructor {
    new (): IControllerInstance;
}
declare class ExpressApplication {
    private port;
    private middlewares;
    private controllers;
    private app;
    get expressApp(): Application;
    constructor(port: string | number, middlewares: RequestHandler[], controllers: Array<new () => unknown>);
    private setupMiddlewares;
    private setupRoutes;
    private configureAssets;
    private setupErrorHandling;
    private setupNotFoundRoute;
    private setupLogger;
    start(): import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
}
export default ExpressApplication;
