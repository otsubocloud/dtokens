"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabSpaces_1 = __importDefault(require("./tabSpaces"));
const toCase_1 = require("./toCase");
function jsonToCssCode(data, options) {
    const { trimBrackets } = options || {};
    const loop = (data, s) => {
        let code = '';
        const keys = Object.keys(data);
        if (!trimBrackets)
            code += `{\n`;
        keys.forEach(key => {
            const value = data[key];
            if (value !== null &&
                typeof value === 'object' &&
                !Array.isArray(value)) {
                code += (0, tabSpaces_1.default)(s + 1) + `${key}: ` + loop(value, s + 1);
            }
            else {
                const cssKey = (0, toCase_1.toKebabCase)(key);
                code += (0, tabSpaces_1.default)(s + 1) + `${cssKey}: ` + value + ';\n';
            }
        });
        if (!trimBrackets)
            code += (0, tabSpaces_1.default)(s) + '}\n';
        return code;
    };
    return loop(data, trimBrackets ? -1 : 0);
}
exports.default = jsonToCssCode;
