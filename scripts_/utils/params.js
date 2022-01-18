"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-04-28 23:06:15
 * @description: 用户参数管理并输出
 */
const fs_1 = __importDefault(require("fs"));
const global_1 = require("./global");
/** 用户参数 */
class Params {
    /** 初始化参数 */
    static init(options, isDev) {
        this.isDev = isDev;
        this.env = options.env;
        this.uniqueName = options.uniqueName;
        this.cdn = options.cdn;
        this.report = options.report;
        this.speed = options.speed;
        /** 过滤不匹配的app */
        this.apps = options.apps && options.apps.split(',').filter((app) => {
            return this.allEntry.includes(app);
        }) || [];
        /** 如果没有匹配的app，则打包全部app */
        this.apps.length === 0 && (this.apps = this.allEntry);
    }
}
exports.Params = Params;
/** 是否为开发环境 */
Params.isDev = true;
/** 构建环境, 默认dev */
Params.env = 'dev';
/** 要构建的模块 */
Params.apps = [];
/** scr目录下的所有入口 */
Params.allEntry = (() => {
    let ls = fs_1.default.readdirSync(global_1.SRC_PATH);
    return ls.filter((app) => app !== 'common');
})();
//# sourceMappingURL=params.js.map