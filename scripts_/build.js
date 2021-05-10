"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuild = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:43
 * @description: 生产环境
 */
var main_1 = require("./main");
var logs_1 = require("./utils/logs");
var runBuild = function () {
    main_1.webpackCompiler.run(function (err, stats) {
        if (err) {
            logs_1.llog(err.message, "red");
            return;
        }
        var info = stats.toJson();
        if (stats.hasErrors()) {
            info.errors.forEach(function (item) {
                logs_1.llog(item.message, "red");
            });
        }
        if (stats.hasWarnings()) {
            info.warnings.forEach(function (item) {
                logs_1.llog(item.message, "yellow");
            });
        }
    });
};
exports.runBuild = runBuild;
