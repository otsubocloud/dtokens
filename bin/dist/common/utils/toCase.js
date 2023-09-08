"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPascalCase = exports.toCamelCase = exports.toSnakeCase = exports.toKebabCase = void 0;
const toKebabCase = (str = '') => {
    if (!str)
        return '';
    return String(str)
        .replace(/^[^A-Za-z0-9*]*|[^A-Za-z0-9*]*$/g, '')
        .replace(/([a-z])([A-Z])/g, function (m, a, b) {
        return a + '_' + b.toLowerCase();
    })
        .replace(/[^A-Za-z0-9*]+|_+/g, '-')
        .toLowerCase();
};
exports.toKebabCase = toKebabCase;
const toSnakeCase = (str) => {
    if (!str)
        return '';
    return String(str)
        .replace(/^[^A-Za-z0-9*]*|[^A-Za-z0-9*]*$/g, '')
        .replace(/([a-z])([A-Z])/g, function (m, a, b) {
        return a + '_' + b.toLowerCase();
    })
        .replace(/[^A-Za-z0-9*]+|_+/g, '_')
        .toLowerCase();
};
exports.toSnakeCase = toSnakeCase;
const toCamelCase = (str) => {
    if (!str)
        return '';
    return String(str)
        .replace(/^[^A-Za-z0-9*]*|[^A-Za-z0-9*]*$/g, '')
        .replace(/[^A-Za-z0-9*]+/g, '$')
        .replace(/([a-z])([A-Z])/g, function (m, a, b) {
        return a + '$' + b;
    })
        .toLowerCase()
        .replace(/(\$)(\w)/g, function (m, a, b) {
        return b.toUpperCase();
    });
};
exports.toCamelCase = toCamelCase;
const toPascalCase = (str) => {
    if (!str)
        return '';
    return String(str)
        .replace(/^[^A-Za-z0-9*]*|[^A-Za-z0-9*]*$/g, '$')
        .replace(/[^A-Za-z0-9*]+/g, '$')
        .replace(/([a-z])([A-Z])/g, function (m, a, b) {
        return a + '$' + b;
    })
        .toLowerCase()
        .replace(/(\$)(\w?)/g, function (m, a, b) {
        return b.toUpperCase();
    });
};
exports.toPascalCase = toPascalCase;
