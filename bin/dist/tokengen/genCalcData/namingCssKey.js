"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const escapeCssKey_1 = __importDefault(require("./escapeCssKey"));
const toCase_1 = require("../../common/utils/toCase");
function namingCssKey(names, cssRules, escape = true) {
    const { prefix, naming = 'unset', separation = '-', decimalPoint = 'dot', } = cssRules || {};
    const toCase = (name) => {
        switch (naming) {
            case 'kebab':
                return (0, toCase_1.toKebabCase)(name);
            case 'snake':
                return (0, toCase_1.toSnakeCase)(name);
            case 'camel':
                return (0, toCase_1.toCamelCase)(name);
            case 'pascal':
                return (0, toCase_1.toPascalCase)(name);
            default:
                return name;
        }
    };
    const convert = (name) => {
        const hasDecimalPoint = /[0-9]*\.[0-9]+/.test(name);
        if (hasDecimalPoint) {
            return name.replace(/\./g, '*');
        }
        const newName = toCase(name);
        return escape ? (0, escapeCssKey_1.default)(newName) : newName;
    };
    const sp = (() => {
        if (separation === '_' || separation === '-' || separation === 'auto') {
            return separation;
        }
        return separation.length > 2 ? separation.slice(0, 2) : separation;
    })();
    const rp = decimalPoint === 'underscore'
        ? '_'
        : decimalPoint === 'hyphen'
            ? '-'
            : '\\.';
    const key = sp === 'auto'
        ? toCase(names.map(name => convert(name)).join('-')).replace('*', rp)
        : names
            .map(name => convert(name))
            .join(sp)
            .replace('*', rp);
    return (prefix || '') + key;
}
exports.default = namingCssKey;
