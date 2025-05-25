"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Methods = void 0;
const metadata_keys_1 = __importDefault(require("../../types/metadata-keys"));
var Methods;
(function (Methods) {
    Methods["Get"] = "get";
    Methods["post"] = "post";
    Methods["PUT"] = "put";
    Methods["DELETE"] = "delete";
})(Methods || (exports.Methods = Methods = {}));
const decoratorFactory = (method) => (path, middlewares) => (target, propertyKey) => {
    const controllerClass = target.constructor;
    const routers = Reflect.hasMetadata(metadata_keys_1.default.ROUTERS, controllerClass)
        ? Reflect.getMetadata(metadata_keys_1.default.ROUTERS, controllerClass)
        : [];
    routers.push({
        method,
        middlewares,
        handlerPath: path,
        handlerName: propertyKey,
    });
    Reflect.defineMetadata(metadata_keys_1.default.ROUTERS, routers, controllerClass);
};
exports.Get = decoratorFactory(Methods.Get);
exports.Post = decoratorFactory(Methods.post);
exports.Put = decoratorFactory(Methods.PUT);
exports.Delete = decoratorFactory(Methods.DELETE);
//# sourceMappingURL=handler.decorator.js.map