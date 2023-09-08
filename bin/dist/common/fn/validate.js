"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consoleError_1 = __importDefault(require("./consoleError"));
function validate(source) {
    if (!source) {
        (0, consoleError_1.default)(`data source is not defined.`);
        return { isError: true };
    }
    const isValidTokens = !!source.tokens && !!Object.keys(source.tokens).length;
    if (!isValidTokens) {
        if (!isValidTokens)
            (0, consoleError_1.default)(`tokens is not defined.`);
        return { isError: true };
    }
    return { isValidTokens };
}
exports.default = validate;
