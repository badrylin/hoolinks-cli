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
const chalk_1 = __importDefault(require("chalk"));
const global_1 = require("./global");
const boxen_1 = __importDefault(require("boxen"));
const os_1 = __importDefault(require("os"));
/** 控制台日志打印 */
const llog = (message, color = 'green') => {
    console.log(chalk_1.default.blue(`[${global_1.pkg.name}]:${chalk_1.default[color](message)}`));
};
exports.llog = llog;
function getAvailableIPs() {
    const interfaces = os_1.default.networkInterfaces();
    const addresses = [];
    for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
            const address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}
const devBoxLog = (params) => {
    const defaultTemplate = `
App running at:
- Time: ${chalk_1.default.yellow(params.time)}
- Local: ${chalk_1.default.cyan(`http://localhost:${params.port}/${params.path}`)}
- Network: ${chalk_1.default.cyan(`http://${getAvailableIPs()[0] || '0.0.0.0'}:${params.port}/${params.path}`)}
`;
    const message = boxen_1.default(defaultTemplate, {
        padding: { left: 2, right: 2, top: 0, bottom: 0 },
        align: 'left',
        borderColor: 'blue',
    });
    console.log(message);
};
exports.devBoxLog = devBoxLog;
//# sourceMappingURL=logs.js.map