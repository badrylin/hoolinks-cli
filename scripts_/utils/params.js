"use strict";
/*
 * @Author: linzeqin
 * @Date: 2021-04-28 23:06:15
 * @description: 参数管理并输出
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
/** 用户参数 */
var Params = /** @class */ (function () {
    function Params() {
    }
    /** 初始化参数 */
    Params.init = function (options) {
        Params.env = options.env;
        Params.apps = options.apps;
        Params.uniqueName = options.uniqueName;
    };
    return Params;
}());
exports.Params = Params;
