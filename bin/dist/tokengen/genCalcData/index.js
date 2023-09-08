"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genVarsData_1 = __importDefault(require("./genVarsData"));
const genTsCode_1 = __importDefault(require("./genTsCode"));
const genTsVarCode_1 = __importDefault(require("./genTsVarCode"));
const toCase_1 = require("../../common/utils/toCase");
function genCalcData(source) {
    const { tokens, config } = source;
    const gen = (tokens) => {
        const arr = [];
        Object.keys(tokens).forEach(key => {
            const value = tokens[key];
            const rootKey = key; // toCleanParentKeysでフォーマット済み
            const typeName = (0, toCase_1.toPascalCase)(rootKey);
            const jsonCode = (0, genTsCode_1.default)(value, 'json');
            const varCode = (0, genTsVarCode_1.default)(rootKey, value, config === null || config === void 0 ? void 0 : config.cssRules);
            const typeCode = (0, genTsCode_1.default)(value, 'type');
            const varTypeCode = (0, genTsCode_1.default)(value, 'type-var');
            const vars = (0, genVarsData_1.default)(rootKey, value, (config === null || config === void 0 ? void 0 : config.cssRules) || {});
            const valueType = typeof value === 'string'
                ? 'string'
                : typeof value === 'number'
                    ? 'number'
                    : 'object';
            arr.push({
                valueType,
                rootKey,
                typeName,
                value,
                jsonCode,
                typeCode,
                varCode,
                varTypeCode,
                vars,
            });
        });
        return arr;
    };
    const calcSource = {
        tokens: gen(tokens),
    };
    return calcSource;
}
exports.default = genCalcData;
