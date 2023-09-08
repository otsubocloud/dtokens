"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateOutputPath(path, expect) {
    if (!path)
        return null;
    const last = path
        .split('/')
        .filter(str => !!str)
        .pop();
    if (expect === 'directory') {
        if (!last || (last === null || last === void 0 ? void 0 : last.includes('.'))) {
            return null;
        }
        return path
            .split('/')
            .filter(str => !!str)
            .join('/');
    }
    else {
        if (path.match(/.+\/$/)) {
            return null;
        }
        if (!last || !(last === null || last === void 0 ? void 0 : last.includes('.'))) {
            return null;
        }
        return path
            .split('/')
            .filter(str => !!str)
            .join('/');
    }
}
exports.default = validateOutputPath;
