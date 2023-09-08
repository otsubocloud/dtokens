"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toFontFamily(names) {
    const arr = [];
    for (let name of names) {
        const value = name.trim();
        if (value) {
            if (value.match(/\s/g)) {
                arr.push(`'${value}'`);
            }
            else {
                arr.push(value);
            }
        }
    }
    return arr.join(', ');
}
exports.default = toFontFamily;
