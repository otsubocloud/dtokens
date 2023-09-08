"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabSpaces_1 = __importDefault(require("../../common/utils/tabSpaces"));
const validateOutputPath_1 = __importDefault(require("../../common/utils/validateOutputPath"));
const consoleError_1 = __importDefault(require("../../common/fn/consoleError"));
const writeFile_1 = __importDefault(require("./writeFile"));
const const_1 = require("../const");
function genCssFile(calcSource, type, outfile, config, options) {
    const isCss = type === 'css';
    const { forBook, consoleOnly } = options || {};
    const contentCode = (rows, spaceCount, valuesType = 'pure-value', prefix = '') => {
        const space = (0, tabSpaces_1.default)(spaceCount);
        const objects = rows.filter(row => row.valueType === 'object');
        const others = rows.filter(row => row.valueType !== 'object');
        const toVar = (key, value) => {
            if (isCss) {
                return `--${key}: ${value};`;
            }
            else {
                if (valuesType === 'pure-value') {
                    return `$${prefix}${key}: ${value};`;
                }
                else {
                    return `$${prefix}${key}: var(--${key});`;
                }
            }
        };
        let v = '';
        objects.forEach(({ rootKey, vars }) => {
            v += space + `/* ${rootKey} */\n`;
            vars.forEach(({ cssKey, value }) => {
                v += space + toVar(cssKey, value) + '\n';
            });
        });
        if (others.length) {
            v += space + `/* others */\n`;
            others.forEach(({ vars }) => {
                const { cssKey, value } = vars[0] || {};
                v += space + toVar(cssKey, value) + '\n';
            });
        }
        return v;
    };
    let code = '';
    code += const_1.NOT_EDIT_MESSAGE;
    code += '\n';
    if (isCss) {
        code += `:root {\n`;
        code += contentCode(calcSource.tokens, 1);
        code += `}\n`;
        code += `\n`;
    }
    else {
        const { scssWithV = true, scssPriority = 'pure-value' } = (config === null || config === void 0 ? void 0 : config.values) || {};
        code += contentCode(calcSource.tokens, 0, scssPriority);
        if (scssWithV) {
            code += `\n`;
            code += `/* - - - - - - - -\n`;
            code += `css variables\n`;
            code += `- - - - - - - - - */\n`;
            code += `\n`;
            code += contentCode(calcSource.tokens, 0, scssPriority === 'css-var' ? 'pure-value' : 'css-var', 'v-');
        }
    }
    if (!outfile) {
        return code;
    }
    const validOutfile = (0, validateOutputPath_1.default)(outfile, 'file');
    if (validOutfile) {
        (0, writeFile_1.default)(validOutfile, code, consoleOnly);
    }
    else {
        (0, consoleError_1.default)(`"${outfile}" is invalid file path.`);
    }
}
exports.default = genCssFile;
