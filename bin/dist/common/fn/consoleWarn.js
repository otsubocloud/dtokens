"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coloring_1 = require("../utils/coloring");
function consoleWarn(message) {
    console.warn(`${coloring_1.yellow}[dtokens warn] ${message}${coloring_1.reset}`);
}
exports.default = consoleWarn;
