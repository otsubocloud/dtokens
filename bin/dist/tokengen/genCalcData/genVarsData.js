"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isStringOrNumber_1 = __importDefault(require("../../common/utils/isStringOrNumber"));
const isValidValue_1 = __importDefault(require("../../common/utils/isValidValue"));
const isPassKey_1 = __importDefault(require("../formatData/isPassKey"));
const namingCssKey_1 = __importDefault(require("./namingCssKey"));
const namingJsKey_1 = __importDefault(require("./namingJsKey"));
function genVarsData(rootKey, data, cssRules) {
    const isRootPassKey = (0, isPassKey_1.default)(rootKey);
    if ((0, isStringOrNumber_1.default)(data)) {
        if (isRootPassKey) {
            return [];
        }
        const pathKeys = [rootKey];
        return [
            {
                pathKeys: pathKeys,
                cssKey: (0, namingCssKey_1.default)(pathKeys, cssRules),
                jsKey: (0, namingJsKey_1.default)(pathKeys),
                value: data,
            },
        ];
    }
    const arr = [];
    const repeat = (data, names) => {
        for (let key of Object.keys(data)) {
            const value = data[key];
            if ((0, isValidValue_1.default)(value)) {
                if ((0, isStringOrNumber_1.default)(value)) {
                    const pathKeys = (() => {
                        const arr = names.concat([key]);
                        if (isRootPassKey) {
                            return arr.filter(key => key !== rootKey);
                        }
                        return arr;
                    })();
                    arr.push({
                        pathKeys,
                        cssKey: (0, namingCssKey_1.default)(pathKeys, cssRules),
                        jsKey: (0, namingJsKey_1.default)(pathKeys),
                        value: value,
                    });
                }
                else if (typeof value === 'object') {
                    repeat(value, names.concat([key]));
                }
            }
        }
    };
    repeat(data, [rootKey]);
    return arr;
}
exports.default = genVarsData;
