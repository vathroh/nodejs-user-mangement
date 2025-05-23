import { RequestHandler } from "express";
declare class ExpressApplication {
    private port;
    private middlewares;
    private controllers;
    private app;
    constructor(port: string | number, middlewares: RequestHandler[], controllers: any[]);
    private setupMiddlewares;
    private setupRoutes;
    private configureAssets;
    private setupLogger;
    start(): import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
}
export default ExpressApplication;
