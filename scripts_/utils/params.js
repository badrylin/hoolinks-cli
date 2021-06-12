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
var fs_1 = __importDefault(require("fs"));
var global_1 = require("./global");
/** 用户参数 */
var Params = /** @class */ (function () {
    function Params() {
    }
    /** 初始化参数 */
    Params.init = function (options, isDev) {
        var _this = this;
        this.isDev = isDev;
        this.env = options.env;
        this.uniqueName = options.uniqueName;
        this.report = options.report;
        this.speed = options.speed;
        /** 获取非法app */
        this.apps = options.apps && options.apps.split(',').filter(function (app) {
            return _this.allEntry.includes(app);
        });
        /** 如果没有匹配的app，则打包全部app */
        this.apps.length === 0 && (this.apps = this.allEntry);
    };
    /** 是否为开发环境 */
    Params.isDev = true;
    /** scr目录下的所有入口 */
    Params.allEntry = (function () {
        var ls = fs_1.default.readdirSync(global_1.SRC_PATH);
        return ls.filter(function (app) { return app !== 'common'; });
    })();
    return Params;
}());
exports.Params = Params;
