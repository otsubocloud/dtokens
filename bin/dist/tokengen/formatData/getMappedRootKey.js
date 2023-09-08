"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMappedRootKey(key, mapKeys) {
    if (!mapKeys)
        return key;
    const oldKeys = Object.keys(mapKeys);
    for (let oldKey of oldKeys) {
        const newKey = mapKeys[oldKey];
        if (key === oldKey) {
            return newKey;
        }
    }
    return key;
}
exports.default = getMappedRootKey;
