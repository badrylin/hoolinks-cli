"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devBoxLog = exports.llog = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-06-09 16:39:41
 * @description: 控制台日志管理
 */
var chalk_1 = __importDefault(require("chalk"));
var global_1 = require("./global");
var boxen_1 = __importDefault(require("boxen"));
var os_1 = __importDefault(require("os"));
/** 控制台日志打印 */
var llog = function (message, color) {
    if (color === void 0) { color = 'green'; }
    console.log(chalk_1.default.blue("[" + global_1.pkg.name + "]:" + chalk_1.default[color](message)));
};
exports.llog = llog;
function getAvailableIPs() {
    var interfaces = os_1.default.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}
var devBoxLog = function (params) {
    var defaultTemplate = "\nApp running at:\n- Time: " + chalk_1.default.yellow(params.time) + "\n- Local: " + chalk_1.default.cyan("http://localhost:" + params.port + "/" + params.path) + "\n- Network: " + chalk_1.default.cyan("http://" + (getAvailableIPs()[0] || '0.0.0.0') + ":" + params.port + "/" + params.path) + "\n";
    var message = (0, boxen_1.default)(defaultTemplate, {
        padding: { left: 2, right: 2, top: 0, bottom: 0 },
        align: 'left',
        borderColor: 'blue',
    });
    console.log(message);
};
exports.devBoxLog = devBoxLog;
