"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toCleanJson(data, shouldValid) {
    const loop = (data, nest, keys) => {
        const newData = {};
        const dataKeys = Object.keys(data);
        dataKeys.forEach(key => {
            const value = data[key];
            if (value !== null &&
                typeof value === 'object' &&
                !Array.isArray(value)) {
                const obj = loop(value, nest + 1, keys.concat([key]));
                if (obj)
                    newData[key] = obj;
            }
            else {
                if (shouldValid(key, value, { nest, keys })) {
                    newData[key] = value;
                }
            }
        });
        const newKeys = Object.keys(newData);
        return newKeys.length ? newData : undefined;
    };
    return loop(data, 0, []);
}
exports.default = toCleanJson;
