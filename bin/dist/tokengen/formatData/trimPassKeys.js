"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPassKey_1 = __importDefault(require("./isPassKey"));
const isStringOrNumber_1 = __importDefault(require("../../common/utils/isStringOrNumber"));
/** @description
 * "(pass_key)": 400 などの不正値も取り除く
 * */
function trimPassKeys(source, skipRootConvert) {
    if (!source.tokens) {
        return source;
    }
    const { tokens } = source;
    const loop = (tokens, i) => {
        const isSkip = skipRootConvert && i === 0;
        let newTokens = {};
        Object.keys(tokens).forEach(key => {
            const data = tokens[key];
            if ((0, isPassKey_1.default)(key) && !isSkip) {
                if (typeof data === 'object') {
                    newTokens = Object.assign(Object.assign({}, newTokens), loop(data, i + 1));
                }
            }
            else {
                if ((0, isStringOrNumber_1.default)(data)) {
                    newTokens[key] = data;
                }
                else if (!!data) {
                    newTokens[key] = loop(data, i + 1);
                }
            }
        });
        return newTokens;
    };
    const newTokens = loop(tokens, 0);
    return Object.assign(Object.assign({}, source), { tokens: newTokens });
}
exports.default = trimPassKeys;
