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
exports.devServerConfig = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:55
 * @description: 开发环境
 */
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var config_1 = require("./utils/config");
var global_1 = require("./utils/global");
var logs_1 = require("./utils/logs");
var webpack_1 = require("./webpack");
exports.devServerConfig = __assign({ contentBase: global_1.SRC_PATH, open: true, stats: 'errors-only', noInfo: true, port: 9000, hot: true }, config_1.eConfig.devServer);
exports.default = (function () {
    webpack_dev_server_1.default.addDevServerEntrypoints(webpack_1.CliMain.config, exports.devServerConfig);
    // @ts-ignore
    new webpack_dev_server_1.default(webpack_1.CliMain.compiler, exports.devServerConfig).listen(exports.devServerConfig.port, function (error) {
        logs_1.llog(error, 'red');
    });
});
