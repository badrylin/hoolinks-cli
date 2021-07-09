"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: linzeqin
 * @Date: 2021-07-08 11:46:18
 * @description: dll生成, 独立的webpack配置，跟dev和build不同
 */
var webpack_1 = require("webpack");
var global_1 = require("./utils/global");
var params_1 = require("./utils/params");
var speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var logs_1 = require("./utils/logs");
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var config_1 = require("./utils/config");
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var config = {
    mode: 'production',
    cache: false,
    entry: {},
    output: {
        path: global_1.CACHE_PATH,
        filename: "[name].dll.[fullhash].js",
        /** 全局变量，防止冲突 */
        library: "[name]_dll_[fullhash]",
        /** 默认umd模式 */
        libraryTarget: "umd",
    },
    plugins: __spreadArray([
        /** 清空打包文件夹 */
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
        new webpack_1.DllPlugin({
            path: path_1.default.join(global_1.CACHE_PATH, '[name].dll.manifest.json'),
            /** 公开的dll函数的名称，和 output.library保持一致 */
            name: "[name]_dll_[fullhash]",
            format: true,
        })
    ], params_1.Params.report ? [new webpack_bundle_analyzer_1.BundleAnalyzerPlugin()] : []),
    resolve: {
        modules: [global_1.NODE_MODULES_PATH],
        extensions: [".js"],
    },
    optimization: {
        minimizer: [
            new terser_webpack_plugin_1.default({
                extractComments: false,
            }),
        ],
        minimize: true,
    }
};
exports.default = (function () {
    var compiler = webpack_1.webpack(params_1.Params.speed
        ? new speed_measure_webpack_plugin_1.default(params_1.Params.speed).wrap(webpack_merge_1.default(config, config_1.eConfig.dllWebpack))
        : webpack_merge_1.default(config, config_1.eConfig.dllWebpack));
    compiler.run(function (err, stats) {
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
});
