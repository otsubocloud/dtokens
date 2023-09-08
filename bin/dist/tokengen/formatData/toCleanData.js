"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isValidValue_1 = __importDefault(require("../../common/utils/isValidValue"));
const isStringOrNumber_1 = __importDefault(require("../../common/utils/isStringOrNumber"));
const isPassKey_1 = __importDefault(require("./isPassKey"));
const MAX_REPEAT = 10;
/** @description stringとnumber以外は受け付けないように。
 * null や undefined や関数などの値を取り除く
 * */
function toCleanData(source) {
    if (!source.tokens) {
        return source;
    }
    const { tokens } = source;
    let repeatCount = 0;
    let invalidFlag = false;
    const repeat = (tokens) => {
        invalidFlag = false;
        const recursive = (data) => {
            const newData = {};
            for (let key of Object.keys(data)) {
                const v = data[key];
                const newKey = cleanJsonKey(key);
                if ((0, isValidValue_1.default)(v)) {
                    if ((0, isStringOrNumber_1.default)(v)) {
                        newData[newKey] = v;
                    }
                    else {
                        newData[newKey] = recursive(v);
                    }
                }
                else {
                    invalidFlag = true;
                }
            }
            return newData;
        };
        const newTokens = recursive(tokens);
        repeatCount += 1;
        if (repeatCount > MAX_REPEAT)
            return newTokens;
        return invalidFlag ? repeat(newTokens) : newTokens;
    };
    const newTokens = repeat(tokens);
    return Object.assign(Object.assign({}, source), { tokens: newTokens });
}
exports.default = toCleanData;
/** @description rootKeyとは違って./が含まれていることに注意
 * ※ space['1.5'] や　grid['1/3'] の入力を想定 */
const cleanJsonKey = (v) => {
    let key = v.replace(/[^a-zA-Z0-9-_./()]/g, '');
    if (!(0, isPassKey_1.default)(key)) {
        key = key.replace(/[()]/g, '');
    }
    return key;
};
