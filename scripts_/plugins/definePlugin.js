"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definePlugin = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-06-09 14:19:40
 * @description: 全局变量管理
 */
const webpack_1 = require("webpack");
const params_1 = require("../utils/params");
exports.definePlugin = [
    new webpack_1.DefinePlugin({
        'process.env.__DEV__': JSON.stringify(params_1.Params.isDev),
        // 'process.env.NODE_ENV': JSON.stringify(Params.env),
        'process.env.environment': JSON.stringify(params_1.Params.env),
    })
];
