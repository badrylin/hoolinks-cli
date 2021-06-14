"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definePlugin = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-06-09 14:19:40
 * @description: 全局变量管理
 */
var webpack_1 = require("webpack");
var params_1 = require("../utils/params");
exports.definePlugin = [
    new webpack_1.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(params_1.Params.env),
        'process.env.environment': JSON.stringify(params_1.Params.env),
    })
];
