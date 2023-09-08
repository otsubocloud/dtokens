"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genCalcData_1 = __importDefault(require("../genCalcData"));
const toCleanRootKeys_1 = __importDefault(require("./toCleanRootKeys"));
const toCleanData_1 = __importDefault(require("./toCleanData"));
const replaceVariables_1 = __importDefault(require("./replaceVariables"));
const trimPassKeys_1 = __importDefault(require("./trimPassKeys"));
const mapTokenKeys_1 = __importDefault(require("./mapTokenKeys"));
function formatData(source) {
    let __originalData = source;
    __originalData = (0, toCleanRootKeys_1.default)(source);
    __originalData = (0, toCleanData_1.default)(__originalData);
    __originalData = (0, replaceVariables_1.default)(__originalData);
    const originalData = (0, trimPassKeys_1.default)(__originalData, true);
    let mappedData = (0, mapTokenKeys_1.default)(originalData);
    mappedData = (0, trimPassKeys_1.default)(mappedData);
    const calcSource = (0, genCalcData_1.default)(mappedData);
    return {
        originalData,
        mappedData,
        calcSource,
    };
}
exports.default = formatData;
