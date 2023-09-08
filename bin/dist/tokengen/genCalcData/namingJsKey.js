"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function namingJsKey(names) {
    let key = '';
    names.forEach(name => {
        if (name.match(/^[0-9]+$/) || name.match(/^[0-9]+\.[0-9]+$/)) {
            key += `[${name}]`;
        }
        else if (name.match(/^[0-9-]+/)) {
            key += `['${name}']`;
        }
        else if (name.match(/^[a-zA-Z0-9-_]+$/)) {
            key += `.${name}`;
        }
        else {
            key += `['${name}']`;
        }
    });
    return key.replace(/^\./, '');
}
exports.default = namingJsKey;
