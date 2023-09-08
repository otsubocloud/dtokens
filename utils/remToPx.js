"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function remToPx(rem) {
    const num = (() => {
        const r = Number(rem);
        const n = isNaN(r)
            ? Number(rem.toString().replace('rem', ''))
            : r;
        return isNaN(n) ? 0 : n;
    })();
    return num * 16 + 'px';
}
exports.default = remToPx;
