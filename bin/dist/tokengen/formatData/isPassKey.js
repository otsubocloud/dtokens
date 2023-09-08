"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPassKey(key) {
    return !!key.match(/^\([a-zA-Z0-9-_]+\)$/);
}
exports.default = isPassKey;
