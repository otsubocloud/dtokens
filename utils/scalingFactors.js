"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function scalingFactors(variables, config) {
    const tokens = {};
    const { scaling = 4, unit = 'rem', prefix = '', } = config || {};
    for (let factor of variables) {
        tokens[prefix + factor] =
            unit === 'px'
                ? factor * scaling + 'px'
                : (1 / 16) * factor * scaling + 'rem';
    }
    return tokens;
}
exports.default = scalingFactors;
