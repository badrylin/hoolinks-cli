"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:43
 * @description: 生产环境
 */
var logs_1 = require("./utils/logs");
var webpack_1 = require("./webpack");
var run = function () {
    webpack_1.CliMain.compiler.run(function (err, stats) {
        if (err) {
            (0, logs_1.llog)(err.message, "red");
            return;
        }
        var info = stats.toJson();
        if (stats.hasErrors()) {
            info.errors.forEach(function (item) {
                (0, logs_1.llog)(item.message, "red");
            });
        }
        if (stats.hasWarnings()) {
            info.warnings.forEach(function (item) {
                (0, logs_1.llog)(item.message, "yellow");
            });
        }
        /** close */
        webpack_1.CliMain.compiler.close(function (err) {
            err && (0, logs_1.llog)(err, "red");
        });
    });
};
exports.run = run;
