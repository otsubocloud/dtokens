"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genScriptFile_1 = __importDefault(require("./genFiles/genScriptFile"));
const genCssFile_1 = __importDefault(require("./genFiles/genCssFile"));
const genJsonFile_1 = __importDefault(require("./genFiles/genJsonFile"));
const formatData_1 = __importDefault(require("./formatData"));
const const_1 = require("./const");
const validate_1 = __importDefault(require("../common/fn/validate"));
const relativeProjectRoot = process.env.RELATIVE_PATH;
const scriptType = process.env.SCRIPT_TYPE;
const configFileName = process.env.CONFIG_FILE_NAME;
const targetFile = scriptType === 'js' ? `${configFileName}.js` : `${configFileName}.ts`;
import(relativeProjectRoot + targetFile).then(s => {
    const source = s.default.default;
    const { isError, isValidTokens } = (0, validate_1.default)(source);
    if (isError) {
        throw new Error('');
        process.exit(1);
    }
    const { config } = source;
    const { tsFile, cssFile, scssFile, jsonFile, jsFile } = (() => {
        const outputs = config === null || config === void 0 ? void 0 : config.outputs;
        const isEmpty = !outputs || !Object.keys(outputs).length;
        return {
            tsFile: isEmpty ? const_1.DEFAULT_OUTPUT_DIR + '/index.ts' : outputs === null || outputs === void 0 ? void 0 : outputs.tsFile,
            cssFile: isEmpty ? const_1.DEFAULT_OUTPUT_DIR + '/css.css' : outputs === null || outputs === void 0 ? void 0 : outputs.cssFile,
            scssFile: isEmpty ? const_1.DEFAULT_OUTPUT_DIR + '/scss.scss' : outputs === null || outputs === void 0 ? void 0 : outputs.scssFile,
            jsFile: outputs === null || outputs === void 0 ? void 0 : outputs.jsFile,
            jsonFile: outputs === null || outputs === void 0 ? void 0 : outputs.jsonFile,
        };
    })();
    const { mappedData, calcSource } = (0, formatData_1.default)(source);
    if (isValidTokens) {
        if (tsFile) {
            (0, genScriptFile_1.default)(calcSource, 'ts', tsFile, config);
        }
        if (jsFile) {
            (0, genScriptFile_1.default)(calcSource, 'js', jsFile, config);
        }
        if (cssFile) {
            (0, genCssFile_1.default)(calcSource, 'css', cssFile, config);
        }
        if (scssFile) {
            (0, genCssFile_1.default)(calcSource, 'scss', scssFile, config);
        }
        if (jsonFile) {
            (0, genJsonFile_1.default)(mappedData, jsonFile);
        }
    }
    console.log('\u2705  The tokens files are generated.');
    (() => {
        const data = {
            TS: tsFile,
            JS: jsFile,
            CSS: cssFile,
            SCSS: scssFile,
            JSON: jsonFile,
        };
        Object.entries(data).forEach(([key, outfile]) => {
            if (outfile)
                console.log(`\u2728 ${key} File --> ${outfile}`);
        });
    })();
});
