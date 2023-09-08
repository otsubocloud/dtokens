"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blueGray = exports.gray = exports.brown = exports.rose = exports.pink = exports.fuchsia = exports.purple = exports.violet = exports.indigo = exports.blue = exports.sky = exports.cyan = exports.teal = exports.emerald = exports.green = exports.lightGreen = exports.lime = exports.yellow = exports.amber = exports.orange = exports.deepOrange = exports.red = void 0;
const utils_1 = require("../utils");
exports.red = (0, utils_1.paletten)({
    0: 'hsl(0,90%,100%)',
    100: 'hsl(0,90%,94%)',
    500: 'hsl(0,85%,60%)',
    900: 'hsl(0,90%,30%)',
    1000: 'hsl(0,100%,15%)',
});
exports.deepOrange = (0, utils_1.paletten)({
    0: 'hsl(15,99%,100%)',
    100: 'hsl(15,99%,93%)',
    500: 'hsl(15,99%,55%)',
    900: 'hsl(18,100%,30%)',
    1000: 'hsl(20,100%,15%)',
});
exports.orange = (0, utils_1.paletten)({
    0: 'hsl(35,98%,100%)',
    500: 'hsl(30,98%,50%)',
    900: 'hsl(27,98%,30%)',
    1000: 'hsl(23,98%,15%)',
});
exports.amber = (0, utils_1.paletten)({
    0: 'hsl(50,100%,100%)',
    500: 'hsl(40,95%,50%)',
    900: 'hsl(35,100%,30%)',
    1000: 'hsl(30,100%,10%)',
});
exports.yellow = (0, utils_1.paletten)({
    0: 'hsl(53,100%,100%)',
    500: 'hsl(53,100%,55%)',
    600: 'hsl(50,100%,47%)',
    900: 'hsl(45,100%,25%)',
    1000: 'hsl(40,100%,15%)',
});
exports.lime = (0, utils_1.paletten)({
    0: 'hsl(65,70%,100%)',
    500: 'hsl(65,70%,50%)',
    900: 'hsl(65,70%,25%)',
    1000: 'hsl(70,70%,10%)',
});
exports.lightGreen = (0, utils_1.paletten)({
    0: 'hsl(95,70%,100%)',
    200: 'hsl(95,65%,85%)',
    500: 'hsl(95,60%,50%)',
    900: 'hsl(100,60%,25%)',
    1000: 'hsl(105,60%,10%)',
});
exports.green = (0, utils_1.paletten)({
    0: 'hsl(140,60%,100%)',
    100: 'hsl(140,70%,93%)',
    200: 'hsl(140,70%,88%)',
    500: 'hsl(140,70%,45%)',
    900: 'hsl(140,70%,20%)',
    1000: 'hsl(120,70%,10%)',
});
exports.emerald = (0, utils_1.paletten)({
    0: 'hsl(160,55%,100%)',
    100: 'hsl(160,60%,90%)',
    400: 'hsl(160,75%,47%)',
    500: 'hsl(160,85%,40%)',
    900: 'hsl(165,100%,15%)',
    1000: 'hsl(170,100%,5%)',
});
exports.teal = (0, utils_1.paletten)({
    0: 'hsl(175,60%,100%)',
    400: 'hsl(175,60%,53%)',
    500: 'hsl(175,80%,40%)',
    900: 'hsl(180,75%,20%)',
    1000: 'hsl(185,70%,10%)',
});
exports.cyan = (0, utils_1.paletten)({
    0: 'hsl(190,95%,100%)',
    300: 'hsl(190,90%,70%)',
    400: 'hsl(190,85%,55%)',
    500: 'hsl(190,95%,45%)',
    900: 'hsl(195,95%,20%)',
    1000: 'hsl(200,95%,10%)',
});
exports.sky = (0, utils_1.paletten)({
    0: 'hsl(200,100%,100%)',
    100: 'hsl(200,100%,93%)',
    // 400: 'hsl(200,85%,55%)',
    500: 'hsl(200,95%,48%)',
    900: 'hsl(200,95%,25%)',
    1000: 'hsl(205,95%,10%)',
});
exports.blue = (0, utils_1.paletten)({
    0: 'hsl(215,100%,100%)',
    100: 'hsl(215,100%,93%)',
    500: 'hsl(215,90%,60%)',
    900: 'hsl(215,95%,25%)',
    1000: 'hsl(220,100%,10%)',
});
exports.indigo = (0, utils_1.paletten)({
    0: 'hsl(220,100%,100%)',
    100: 'hsl(225,100%,93%)',
    500: 'hsl(235,75%,60%)',
    600: 'hsl(235,65%,48%)',
    900: 'hsl(235,65%,30%)',
    1000: 'hsl(240,100%,10%)',
});
exports.violet = (0, utils_1.paletten)({
    0: 'hsl(250,100%,100%)',
    100: 'hsl(255,100%,94%)',
    500: 'hsl(260,70%,58%)',
    600: 'hsl(260,65%,48%)',
    900: 'hsl(260,90%,30%)',
    1000: 'hsl(260,100%,15%)',
});
exports.purple = (0, utils_1.paletten)({
    0: 'hsl(275,100%,100%)',
    100: 'hsl(275,100%,94%)',
    300: 'hsl(275,85%,85%)',
    400: 'hsl(275,80%,75%)',
    500: 'hsl(275,70%,60%)',
    600: 'hsl(275,60%,50%)',
    900: 'hsl(275,90%,30%)',
    1000: 'hsl(280,100%,15%)',
});
exports.fuchsia = (0, utils_1.paletten)({
    0: 'hsl(285,100%,100%)',
    200: 'hsl(285,95%,90%)',
    // 300: 'hsl(275,85%,85%)',
    // 400: 'hsl(275,80%,75%)',
    500: 'hsl(290,80%,60%)',
    600: 'hsl(290,60%,50%)',
    900: 'hsl(295,90%,30%)',
    1000: 'hsl(295,100%,15%)',
});
exports.pink = (0, utils_1.paletten)({
    0: 'hsl(330,100%,100%)',
    200: 'hsl(330,95%,90%)',
    500: 'hsl(330,80%,55%)',
    600: 'hsl(330,65%,50%)',
    900: 'hsl(330,90%,30%)',
    1000: 'hsl(330,100%,15%)',
});
exports.rose = (0, utils_1.paletten)({
    0: 'hsl(350,100%,100%)',
    200: 'hsl(350,95%,90%)',
    500: 'hsl(350,80%,55%)',
    600: 'hsl(350,65%,49%)',
    900: 'hsl(345,90%,30%)',
    1000: 'hsl(340,100%,12%)',
});
exports.brown = (0, utils_1.paletten)({
    0: 'hsl(15,25%,100%)',
    100: 'hsl(15,25%,93%)',
    200: 'hsl(15,25%,85%)',
    500: 'hsl(15,25%,40%)',
    900: 'hsl(10,30%,25%)',
    1000: 'hsl(10,35%,10%)',
});
exports.gray = (0, utils_1.paletten)({
    0: 'hsl(0,0%,100%)',
    100: 'hsl(0,0%,95%)',
    200: 'hsl(0,0%,90%)',
    500: 'hsl(0,0%,50%)',
    1000: 'hsl(0,0%,0%)',
});
exports.blueGray = (0, utils_1.paletten)({
    0: 'hsl(200,10%,100%)',
    100: 'hsl(200,10%,95%)',
    200: 'hsl(200,10%,90%)',
    500: 'hsl(200,10%,50%)',
    1000: 'hsl(200,10%,0%)',
});
