"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paletten = exports.scalingFactors = exports.toFontFamily = exports.remToPx = exports.pxToRem = void 0;
const paletten_1 = require("paletten");
Object.defineProperty(exports, "paletten", { enumerable: true, get: function () { return paletten_1.paletten; } });
const pxToRem_1 = __importDefault(require("./pxToRem"));
exports.pxToRem = pxToRem_1.default;
const remToPx_1 = __importDefault(require("./remToPx"));
exports.remToPx = remToPx_1.default;
const scalingFactors_1 = __importDefault(require("./scalingFactors"));
exports.scalingFactors = scalingFactors_1.default;
const toFontFamily_1 = __importDefault(require("./toFontFamily"));
exports.toFontFamily = toFontFamily_1.default;
