"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.llog = void 0;
var chalk_1 = __importDefault(require("chalk"));
var global_1 = require("./global");
/** 控制台日志打印 */
var llog = function (message, color) {
    if (color === void 0) { color = 'green'; }
    console.log(chalk_1.default.blue("[" + global_1.pkg.name + "]:" + chalk_1.default[color](message)));
};
exports.llog = llog;
