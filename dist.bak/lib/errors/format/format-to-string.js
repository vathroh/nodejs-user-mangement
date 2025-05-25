"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorsToFlatString(object) {
    return Object.entries(object)
        .map(([key, messages]) => `${key}: ${messages.join(", ")}`)
        .join("\n");
}
exports.default = errorsToFlatString;
//# sourceMappingURL=format-to-string.js.map