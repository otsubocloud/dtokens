"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabSpaces_1 = __importDefault(require("../../common/utils/tabSpaces"));
const isValidValue_1 = __importDefault(require("../../common/utils/isValidValue"));
const wrapKey_1 = __importDefault(require("../../common/utils/wrapKey"));
const isStringOrNumber_1 = __importDefault(require("../../common/utils/isStringOrNumber"));
const namingCssKey_1 = __importDefault(require("./namingCssKey"));
function genTsVarCode(rootKey, data, cssRules) {
    const repeat = (data, tabs, names) => {
        if ((0, isStringOrNumber_1.default)(data)) {
            return `"var(--${(0, namingCssKey_1.default)(names, cssRules)})",\n`;
        }
        else if (typeof data === 'object') {
            let str = `{\n`;
            Object.keys(data).forEach(key => {
                const value = data[key];
                if ((0, isValidValue_1.default)(value)) {
                    str +=
                        (0, tabSpaces_1.default)(tabs) +
                            `${(0, wrapKey_1.default)(key)}: ${repeat(value, tabs + 1, names.concat([key]))}`;
                }
            });
            str += (0, tabSpaces_1.default)(tabs - 1) + (tabs === 1 ? '}' : `},\n`);
            return str;
        }
    };
    return repeat(data, 1, [rootKey]) || '';
}
exports.default = genTsVarCode;
