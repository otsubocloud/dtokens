"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const consoleError_1 = __importDefault(require("../../common/fn/consoleError"));
function writeFile(path, data, consoleOnly) {
    const dirUrl = getFileDirectoryPath(path);
    if (!dirUrl) {
        (0, consoleError_1.default)(`"${path}" is invalid path.`);
        return;
    }
    if (!fs.existsSync(dirUrl)) {
        fs.mkdirSync(dirUrl, { recursive: true });
    }
    if (consoleOnly) {
        console.log(data);
        return;
    }
    fs.writeFileSync(_path.resolve(path), data, 'utf8');
}
exports.default = writeFile;
const isDirectory = (path) => {
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
        return true;
    }
    return false;
};
const getFileDirectoryPath = (path) => {
    // if path is directory
    if (path.match(/.+\/$/)) {
        return null;
    }
    else {
        return path
            .split('/')
            .filter(str => !!str)
            .slice(0, -1)
            .join('/');
    }
};
