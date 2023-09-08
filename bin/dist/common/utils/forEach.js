"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function forEach(obj, fn) {
    Object.keys(obj).forEach((key, i) => fn(obj[key], key));
}
exports.default = forEach;
