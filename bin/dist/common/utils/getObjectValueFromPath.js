"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getObjectValueFromPath(data, pathKeys) {
    let current = data;
    for (let key of pathKeys) {
        let value = current === null || current === void 0 ? void 0 : current[key];
        if (value !== undefined) {
            current = value;
        }
        else {
            return;
        }
    }
    return current;
}
exports.default = getObjectValueFromPath;
