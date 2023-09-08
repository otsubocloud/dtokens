"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pxToRem(px) {
    const num = (() => {
        const p = Number(px);
        const n = isNaN(p)
            ? Number(px.toString().replace('px', ''))
            : p;
        return isNaN(n) ? 0 : n;
    })();
    return (1 / 16) * (num !== null && num !== void 0 ? num : 0) + 'rem';
}
exports.default = pxToRem;
