"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabSpaces_1 = __importDefault(require("./tabSpaces"));
const wrapKey_1 = __importDefault(require("./wrapKey"));
function jsonFormatStringify(data) {
    const loop = (data, s) => {
        let code = '';
        const keys = Object.keys(data);
        code += `{\n`;
        keys.forEach(key => {
            const value = data[key];
            if (value !== null &&
                typeof value === 'object' &&
                !Array.isArray(value)) {
                code += (0, tabSpaces_1.default)(s + 1) + `${(0, wrapKey_1.default)(key)}: ` + loop(value, s + 1);
            }
            else {
                code +=
                    (0, tabSpaces_1.default)(s + 1) + `${(0, wrapKey_1.default)(key)}: ` + JSON.stringify(value) + ',\n';
            }
        });
        code += (0, tabSpaces_1.default)(s) + (s === 0 ? '}\n' : '},\n');
        return code;
    };
    return loop(data, 0);
}
exports.default = jsonFormatStringify;
