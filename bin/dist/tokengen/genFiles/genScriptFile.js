"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabSpaces_1 = __importDefault(require("../../common/utils/tabSpaces"));
const validateOutputPath_1 = __importDefault(require("../../common/utils/validateOutputPath"));
const consoleError_1 = __importDefault(require("../../common/fn/consoleError"));
const writeFile_1 = __importDefault(require("./writeFile"));
const wrapKey_1 = __importDefault(require("../../common/utils/wrapKey"));
const const_1 = require("../const");
function genScriptFile(calcSource, type, outfile, config, options) {
    const { values, outputs } = config || {};
    const jsType = (outputs === null || outputs === void 0 ? void 0 : outputs.jsType) || 'module';
    const rows = calcSource.tokens;
    let code = '';
    code += const_1.NOT_EDIT_MESSAGE;
    code += '\n';
    const genType = type === 'ts'
        ? 'ts'
        : type === 'js' && jsType === 'module'
            ? 'module'
            : 'require';
    code += tokensCode(rows, values, genType);
    if (genType === 'ts') {
        code += deprecatedTypesCode(rows);
    }
    code += deprecatedCode(rows, genType);
    const validOutfile = (0, validateOutputPath_1.default)(outfile, 'file');
    if (validOutfile) {
        (0, writeFile_1.default)(validOutfile, code, options === null || options === void 0 ? void 0 : options.consoleOnly);
    }
    else {
        (0, consoleError_1.default)(`"${outfile}" is invalid file path.`);
    }
}
exports.default = genScriptFile;
const tokensCode = (rows, values, genType = 'ts') => {
    let v = '';
    const { tokensPriority = 'pure-value', tokensWithV = true } = values || {};
    if (tokensWithV) {
        v += header('secondary tokens');
        if (genType === 'ts' || genType === 'module') {
            v += `export const tokensV = {\n`;
        }
        else {
            v += `const tokensV = {\n`;
        }
        v += genTokensJsonCode(rows, 1, tokensPriority === 'pure-value' ? 'css-var' : 'pure-value');
        v += `}\n`;
        v += `\n`;
    }
    v += header('primary tokens');
    v += `const tokens = {\n`;
    v += genTokensJsonCode(rows, 1, tokensPriority);
    if (tokensWithV) {
        v += (0, tabSpaces_1.default)(1) + `v: tokensV,\n`;
    }
    v += `}\n`;
    v += `\n`;
    if (genType === 'ts' || genType === 'module') {
        v += `export default tokens\n`;
    }
    else {
        v += `exports.tokens = tokens\n`;
        v += `exports.tokensV = tokensV\n`;
    }
    v += `\n`;
    return v;
};
/** --------------
 * utils
 * */
const header = (str) => {
    let v = '';
    v += `// - - - - -\n`;
    v += `// ${str}\n`;
    v += `\n`;
    return v;
};
const genTokensJsonCode = (rows, tabSpace = 1, type) => {
    let code = '';
    rows.forEach(({ rootKey, jsonCode, varCode, value, valueType }) => {
        const keyStr = `${(0, wrapKey_1.default)(rootKey)}: `;
        const valueStr = (() => {
            if (type === 'pure-value') {
                return valueType === 'object'
                    ? jsonCode.split('\n').join('\n' + (0, tabSpaces_1.default)(tabSpace))
                    : valueType === 'string'
                        ? `"${value}"`
                        : value;
            }
            else {
                return valueType === 'object'
                    ? varCode.split('\n').join('\n' + (0, tabSpaces_1.default)(tabSpace))
                    : varCode.replace(',\n', '');
            }
        })();
        code += (0, tabSpaces_1.default)(tabSpace) + keyStr + valueStr + ',\n';
    });
    return code;
};
/** --------------
 * deprecated codes
 * */
const deprecatedTypesCode = (rows) => {
    let code = '';
    code += `// - - - - -\n`;
    code += `// Token Types (deprecated)\n`;
    code += `\n`;
    rows.forEach(({ typeName, typeCode }) => {
        code += `/** @deprecated */\n`;
        code += `export type ${typeName} = ` + typeCode;
        code += `\n`;
    });
    return code;
};
const deprecatedCode = (rows, genType = 'ts') => {
    const allVars = (() => {
        let arr = [];
        rows.forEach(row => {
            arr = arr.concat(row.vars);
        });
        return arr;
    })();
    let code = '';
    code += `\n`;
    if (genType === 'ts') {
        code += `// - - - - -\n`;
        code += `// DesignTokenKey (deprecated)\n`;
        code += `\n`;
        /** DesignTokenKey */
        code += `/** @deprecated */\n`;
        if (rows.length) {
            code += `export type DesignTokenKey =\n`;
        }
        else {
            code += `export type DesignTokenKey = string\n`;
        }
        allVars.forEach(({ cssKey }) => {
            code += (0, tabSpaces_1.default)(1) + `| '${cssKey}'\n`;
        });
        code += `\n`;
    }
    code += `// - - - - -\n`;
    code += `// TokenDic (deprecated)\n`;
    code += `\n`;
    /** TokenDic */
    if (genType === 'ts') {
        code += `/** @deprecated */\n`;
        code += `export type TokenDic = { [key in DesignTokenKey]: string }\n`;
        code += `\n`;
    }
    /** tokenDic */
    code += `/** @deprecated */\n`;
    if (genType === 'ts') {
        code += `export const tokenDic: TokenDic = {\n`;
    }
    else if (genType === 'module') {
        code += `export const tokenDic = {\n`;
    }
    else {
        code += `const tokenDic = {\n`;
    }
    allVars.forEach(({ cssKey, value }) => {
        code += (0, tabSpaces_1.default)(1) + `"${cssKey}": "${value}",\n`;
    });
    code += `}\n`;
    code += `\n`;
    code += `// - - - - -\n`;
    code += `// getter functions (deprecated)\n`;
    code += `\n`;
    if (genType === 'require') {
        code += `/** @deprecated */\n`;
        code += `exports.tokenDic = tokenDic`;
    }
    /** function token */
    code += `/** @deprecated */\n`;
    if (genType === 'ts') {
        code += `export const token = (key: DesignTokenKey) => {\n`;
    }
    else if (genType === 'module') {
        code += `export const token = key => {\n`;
    }
    else {
        code += `exports.token = key => {\n`;
    }
    code += (0, tabSpaces_1.default)(1) + `return tokenDic[key]\n`;
    code += `}\n`;
    code += `\n`;
    /** function tokenv */
    code += `/** @deprecated */\n`;
    if (genType === 'ts') {
        code += `export const tokenv = (key: DesignTokenKey) => {\n`;
    }
    else if (genType === 'module') {
        code += `export const tokenv = key => {\n`;
    }
    else {
        code += `exports.tokenv = key => {\n`;
    }
    code +=
        (0, tabSpaces_1.default)(1) +
            `return "var(--" + key.replace(/\\./g, '\\\\.').replace(/\\//g, '\\\\/') + ")"\n`;
    code += `}\n`;
    return code;
};
