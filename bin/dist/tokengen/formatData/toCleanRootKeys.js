"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPassKey_1 = __importDefault(require("./isPassKey"));
/** @description tokensのrootKeyとmapKeysに不整合文字があれば取り除く
 * type型名の生成時に不整合が生まれないようにするため */
function toCleanRootKeys(source) {
    if (!source.tokens) {
        return source;
    }
    const { tokens, config } = source;
    // clean token keys
    const newTokens = {};
    Object.keys(tokens).map((key, i) => {
        const newKey = cleanRootKey(key);
        newTokens[newKey] = tokens[key];
    });
    // clean map keys
    if (!!(config === null || config === void 0 ? void 0 : config.mapKeys)) {
        const newMapKeys = {};
        Object.keys(config.mapKeys).map(key => {
            const newKey = cleanRootKey(key);
            const mapKey = config.mapKeys[key];
            if (mapKey) {
                newMapKeys[newKey] = cleanRootKey(mapKey);
            }
        });
        return Object.assign(Object.assign({}, source), { config: Object.assign(Object.assign({}, config), { mapKeys: newMapKeys }), tokens: newTokens });
    }
    return Object.assign(Object.assign({}, source), { tokens: newTokens });
}
exports.default = toCleanRootKeys;
const cleanRootKey = (v) => {
    let key = v.replace(/[^a-zA-Z0-9-_()]/g, '');
    if (!(0, isPassKey_1.default)(key)) {
        key = key.replace(/[()]/g, '');
    }
    return key;
};
