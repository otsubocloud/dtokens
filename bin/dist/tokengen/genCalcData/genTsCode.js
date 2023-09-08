"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabSpaces_1 = __importDefault(require("../../common/utils/tabSpaces"));
const isValidValue_1 = __importDefault(require("../../common/utils/isValidValue"));
const wrapKey_1 = __importDefault(require("../../common/utils/wrapKey"));
function genTsCode(data, mode) {
    const repeat = (data, tabs) => {
        if (typeof data === 'string' || typeof data === 'number') {
            return mode === 'json'
                ? `${typeof data === 'string' ? `"${data}"` : data},\n`
                : mode === 'type'
                    ? `${typeof data === 'string' ? 'string' : 'number'}\n`
                    : `string\n`;
        }
        else if (typeof data === 'object') {
            let str = `{\n`;
            Object.keys(data).forEach(key => {
                const value = data[key];
                if ((0, isValidValue_1.default)(value)) {
                    str += (0, tabSpaces_1.default)(tabs) + `${(0, wrapKey_1.default)(key)}: ${repeat(value, tabs + 1)}`;
                }
            });
            str +=
                (0, tabSpaces_1.default)(tabs - 1) +
                    (tabs === 1 ? '}' : mode === 'json' ? `},\n` : `}\n`);
            return str;
        }
    };
    return repeat(data, 1) || '';
}
exports.default = genTsCode;
