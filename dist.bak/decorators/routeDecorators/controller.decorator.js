"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_keys_1 = __importDefault(require("../../types/metadata-keys"));
const Controller = (basePath) => (target) => Reflect.defineMetadata(metadata_keys_1.default.BASE_PATH, basePath, target);
exports.default = Controller;
//# sourceMappingURL=controller.decorator.js.map