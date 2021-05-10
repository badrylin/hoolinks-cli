"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parameter = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-04-28 23:06:15
 * @description: 参数管理并输出
 */
var webpack_1 = require("webpack");
var main_1 = require("../main");
/** 用户拓展配置列表 */
var Parameter = /** @class */ (function () {
    function Parameter() {
        /** 构建环境 */
        this.env = "dev";
    }
    /** 初始化参数 */
    Parameter.prototype.init = function (options) {
        if (options === void 0) { options = new Parameter(); }
        var o = __assign(__assign({}, new Parameter()), options);
        this.env = o.env;
        this.apps = o.apps;
        this.uniqueName = o.uniqueName;
        /** 注册全局变量 */
        new webpack_1.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(o.env),
            'process.env.environment': JSON.stringify(o.env),
            'process.env.apps': JSON.stringify(o.apps),
            'process.env.uniqueName': JSON.stringify(o.uniqueName),
        }).apply(main_1.webpackCompiler);
    };
    return Parameter;
}());
exports.parameter = new Parameter();
