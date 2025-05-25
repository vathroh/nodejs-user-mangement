"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(data, metadata, system = {
        status: 200,
        message: "OK",
    }) {
        this.data = null;
        this.metadata = {};
        this.system = {
            status: 200,
            message: "OK",
        };
        this.data = data !== null && data !== void 0 ? data : null;
        this.metadata = metadata !== null && metadata !== void 0 ? metadata : {};
        delete this.system.error;
        Object.assign(this.system, system);
    }
    setData(data) {
        this.data = data;
        return this;
    }
    setMetadata(metadata) {
        this.metadata = metadata;
        return this;
    }
    setSystem(data) {
        var _a, _b;
        delete this.system.error;
        Object.assign(this.system, Object.assign(Object.assign({}, data), { status: (_a = data.status) !== null && _a !== void 0 ? _a : 200, message: (_b = data.message) !== null && _b !== void 0 ? _b : "OK" }));
        return this;
    }
    setError(status, message, error) {
        this.system.status = status;
        this.system.message = message;
        this.system.error =
            typeof error === "string" ? error : (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.toString());
        return this;
    }
    build() {
        const response = {
            system: this.system,
        };
        if (this.data !== null) {
            response.data = this.data;
        }
        if (Object.keys(this.metadata).length > 0) {
            response.metadata = this.metadata;
        }
        return response;
    }
    send(res) {
        var _a;
        const response = this.build();
        return res.status((_a = this.system.status) !== null && _a !== void 0 ? _a : 200).json(response);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=index.js.map