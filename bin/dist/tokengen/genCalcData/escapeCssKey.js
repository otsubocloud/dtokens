"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
function escapeCssKey(key) {
    // ok ".", "/"
    return key
        .replace(const_1.invalidRegExp, '')
        .replace(/\./g, '\\.')
        .replace(/\//g, '\\/');
}
exports.default = escapeCssKey;
