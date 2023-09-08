"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceVariable = void 0;
const isStringOrNumber_1 = __importDefault(require("../../common/utils/isStringOrNumber"));
const consoleWarn_1 = __importDefault(require("../../common/fn/consoleWarn"));
const mapTokenKeys_1 = __importDefault(require("./mapTokenKeys"));
const trimPassKeys_1 = __importDefault(require("./trimPassKeys"));
const namingCssKey_1 = __importDefault(require("../genCalcData/namingCssKey"));
const getMappedRootKey_1 = __importDefault(require("./getMappedRootKey"));
const isPassKey_1 = __importDefault(require("./isPassKey"));
const MAX_RECURSIVE_COUNT = 40;
/** @description "{key}" または "#{key}" を再帰的に置換する
 * "{(colors).primary.500}" にも対応するし、"primary.500" にも対応する */
function replaceVariables(source) {
    const { tokens, config } = source;
    const { tokens: mappedTokens } = (0, trimPassKeys_1.default)((0, mapTokenKeys_1.default)(source));
    let recursiveCount = 0;
    const execLoop = (data, ref, distError = true) => {
        let newData = {};
        const repeat = (value) => {
            var _a, _b;
            if (typeof value === 'string') {
                const details = getVariableDetails(value);
                if (!details) {
                    return value;
                }
                else {
                    let newValue = value;
                    const refs = {
                        tokens: ref.originalTokens,
                        mappedTokens: ref.mappedTokens,
                        config,
                        distError,
                    };
                    (_a = details.ref) === null || _a === void 0 ? void 0 : _a.forEach(variable => {
                        const jsKey = variable.replace(/^\{/, '').replace(/}$/, '');
                        const replaced = (0, exports.replaceVariable)(jsKey, 'ref', refs);
                        if (replaced !== undefined) {
                            newValue = newValue.replace(variable, String(replaced));
                        }
                    });
                    (_b = details.css) === null || _b === void 0 ? void 0 : _b.forEach(variable => {
                        const jsKey = variable.replace(/^#\{/, '').replace(/}$/, '');
                        const replaced = (0, exports.replaceVariable)(jsKey, 'css', refs);
                        if (replaced !== undefined) {
                            newValue = newValue.replace(variable, String(replaced));
                        }
                    });
                    return newValue;
                }
            }
            else if (typeof value === 'number') {
                return value;
            }
            else if (typeof value === 'object') {
                const d = {};
                const keys = Object.keys(value);
                for (let key of keys) {
                    d[key] = repeat(value[key]);
                }
                return d;
            }
        };
        for (let key of Object.keys(data)) {
            newData[key] = repeat(data[key]);
        }
        const getRefValuesList = (_data) => {
            const arr = [];
            const repeat = (value) => {
                if ((0, isStringOrNumber_1.default)(value)) {
                    if (typeof value === 'string' && getVariableDetails(value)) {
                        arr.push(value);
                    }
                }
                else if (typeof value === 'object') {
                    const keys = Object.keys(value);
                    for (let key of keys) {
                        repeat(value[key]);
                    }
                }
            };
            repeat(_data);
            return arr;
        };
        const remainVars = getRefValuesList(newData);
        recursiveCount += 1;
        if (recursiveCount > MAX_RECURSIVE_COUNT) {
            if (distError && remainVars.length) {
                // 限界までループ精査した後に、まだ {key} が残っていれば、ワーニングを出す
                remainVars.forEach(remainVar => {
                    (0, consoleWarn_1.default)(`'${remainVar}' was not referenced in your token definitions.`);
                });
            }
        }
        else if (remainVars.length) {
            newData = execLoop(newData, {
                originalTokens: ref.originalTokens,
                mappedTokens: ref.mappedTokens,
            }, distError);
        }
        return newData;
    };
    const newTokens = execLoop(tokens, {
        originalTokens: tokens,
        mappedTokens: mappedTokens,
    });
    return Object.assign(Object.assign({}, source), { tokens: newTokens });
}
exports.default = replaceVariables;
const CSS_REG = new RegExp(/#{[^}]+}/g);
const REF_REG = new RegExp(/(?<!#){[^}]+}/g);
const getVariableDetails = (valueOrVariable) => {
    const refMatched = valueOrVariable.match(REF_REG);
    const cssMatched = valueOrVariable.match(CSS_REG);
    if (refMatched || cssMatched) {
        return {
            ref: refMatched !== null && refMatched !== void 0 ? refMatched : undefined,
            css: cssMatched !== null && cssMatched !== void 0 ? cssMatched : undefined,
        };
    }
    return null;
};
const isRefVariable = (valueOrVariable) => !!valueOrVariable.match(REF_REG);
const isCssVariable = (valueOrVariable) => !!valueOrVariable.match(CSS_REG);
const replaceVariable = (variable, variableType, refs) => {
    const { tokens, mappedTokens, config, distError = true } = refs;
    const keys = keysConvert(variable);
    const getMatchedValue = (detectTokens) => {
        let matched;
        let current = detectTokens;
        for (let key of keys) {
            if (current !== undefined && current[key] !== undefined) {
                if ((0, isStringOrNumber_1.default)(current[key])) {
                    matched = current[key];
                    break;
                }
                else {
                    current = current[key];
                }
            }
            else {
                break; // 重要
            }
        }
        return matched;
    };
    let matchedValue = mappedTokens ? getMatchedValue(mappedTokens) : undefined;
    if (!matchedValue) {
        matchedValue = getMatchedValue(tokens);
    }
    if ((0, isStringOrNumber_1.default)(matchedValue)) {
        // ここで css var の場合は、mapped後のcss key を生成しなければならない
        if (variableType === 'css') {
            const newKeys = getMappedPathKeys(keys, config === null || config === void 0 ? void 0 : config.mapKeys);
            return `var(--${(0, namingCssKey_1.default)(newKeys, config === null || config === void 0 ? void 0 : config.cssRules)})`;
        }
        return matchedValue;
    }
    else if (typeof matchedValue === 'object') {
        if (distError) {
            (0, consoleWarn_1.default)(`Variable of "${variable}" referred Object.`);
        }
        return undefined;
    }
    return undefined;
};
exports.replaceVariable = replaceVariable;
const keysConvert = (variable) => {
    const arr = variable.split('.');
    const keys = [];
    let nums = [];
    arr.forEach((str, i) => {
        if (str.match(/^[0-9]+$/)) {
            nums.push(str);
        }
        else {
            if (nums.length) {
                keys.push(nums.join('.'));
                nums = [];
            }
            keys.push(str);
        }
    });
    if (nums.length) {
        keys.push(nums.join('.'));
    }
    return keys;
};
const getMappedPathKeys = (names, mapKeys) => {
    const rootKey = (0, getMappedRootKey_1.default)(names[0], mapKeys);
    const newNames = [rootKey]
        .concat(names.slice(1))
        .filter(str => !(0, isPassKey_1.default)(str));
    return newNames;
};
