"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateOutputPath_1 = __importDefault(require("../../common/utils/validateOutputPath"));
const consoleError_1 = __importDefault(require("../../common/fn/consoleError"));
const writeFile_1 = __importDefault(require("./writeFile"));
const forEach_1 = __importDefault(require("../../common/utils/forEach"));
function genJsonFile(source, outfile) {
    const { config } = source;
    const outputJson = {
        tokens: source.tokens,
    };
    (0, forEach_1.default)(outputJson, (row, key) => {
        if (row === undefined) {
            delete outputJson[key];
        }
    });
    const code = JSON.stringify(outputJson, null, 2);
    const validOutfile = (0, validateOutputPath_1.default)(outfile, 'file');
    if (validOutfile) {
        (0, writeFile_1.default)(validOutfile, code);
    }
    else {
        (0, consoleError_1.default)(`"${outfile}" is invalid file path.`);
    }
}
exports.default = genJsonFile;
