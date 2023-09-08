"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coloring_1 = require("../utils/coloring");
function consoleError(message) {
    console.error(`${coloring_1.red}[dtokens error] ${message} ${coloring_1.reset}`);
}
exports.default = consoleError;
