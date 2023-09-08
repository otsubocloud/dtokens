"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidValue(value) {
    if (value === null || value === undefined)
        return false;
    const ofType = typeof value;
    if (ofType === 'object' && Object.keys(value).length > 0) {
        return true;
    }
    else if (ofType === 'string' ||
        ofType === 'number' ||
        ofType === 'bigint') {
        return true;
    }
    return false;
}
exports.default = isValidValue;
