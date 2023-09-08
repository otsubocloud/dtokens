"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOutTitle = exports.commentOutHeader = void 0;
const commentOutHeader = (str, type = 'line') => {
    return type === 'line'
        ? '// - - - - -\n' + `// ${str}\n`
        : `/* - - - - -\n` + `${str}\n` + '- - - */\n';
};
exports.commentOutHeader = commentOutHeader;
const commentOutTitle = (str, type = 'line') => {
    return type === 'line' ? `// ${str}\n` : `/* ${str} */\n`;
};
exports.commentOutTitle = commentOutTitle;
