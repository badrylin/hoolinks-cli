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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDev = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:55
 * @description: 开发环境
 */
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var main_1 = require("./main");
var config_1 = require("./utils/config");
var global_1 = require("./utils/global");
var logs_1 = require("./utils/logs");
var devServer = __assign({ contentBase: global_1.SRC_PATH, 
    /* open: true, */
    stats: 'errors-only', noInfo: true, port: 9000, hot: true }, config_1.eConfig.devServer);
var runDev = function () {
    // @ts-ignore
    var wds = new webpack_dev_server_1.default(main_1.webpackCompiler, devServer).listen(devServer.port, function (error) {
        logs_1.llog(error, 'red');
    });
};
exports.runDev = runDev;
