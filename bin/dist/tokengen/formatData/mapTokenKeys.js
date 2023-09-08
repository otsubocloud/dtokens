"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapTokenKeys(source) {
    var _a;
    if (!source.tokens || !((_a = source === null || source === void 0 ? void 0 : source.config) === null || _a === void 0 ? void 0 : _a.mapKeys)) {
        return source;
    }
    const { tokens } = source;
    const { mapKeys } = source.config;
    const targetKeys = Object.keys(mapKeys).filter(key => key !== 'BOOK_BG');
    const mapTokens = (tokens) => {
        const newTokens = {};
        for (let key of Object.keys(tokens)) {
            const v = tokens[key];
            if (targetKeys.includes(key)) {
                const newKey = mapKeys[key];
                if (v) {
                    // 既に存在している場合はマージ
                    const alreadyValue = newTokens[newKey];
                    if (!!alreadyValue) {
                        newTokens[newKey] = mergeAlreadyValue(alreadyValue, v);
                    }
                    else {
                        newTokens[newKey] = v;
                    }
                }
            }
            else {
                newTokens[key] = v;
            }
        }
        return newTokens;
    };
    const newTokens = mapTokens(tokens);
    return Object.assign(Object.assign({}, source), { tokens: newTokens });
}
exports.default = mapTokenKeys;
const mergeAlreadyValue = (alreadyValue, v) => {
    if (typeof alreadyValue === 'object' && typeof v === 'object') {
        return Object.assign(Object.assign({}, alreadyValue), v);
    }
    /*else if (
          typeof alreadyValue === 'object' &&
          typeof v !== 'object'
      ) {
          return {
              ...alreadyValue,
              value: v,
          }
      } else if (
          typeof alreadyValue !== 'object' &&
          typeof v === 'object'
      ) {
          return {
              ...v,
              value: alreadyValue,
          }
      }*/
    return v;
};
