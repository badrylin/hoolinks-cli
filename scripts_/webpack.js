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
exports.CliMain = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-06-09 17:05:13
 * @description: webpack基础配置
 */
var css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
var speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var webpack_1 = require("webpack");
var webpack_merge_1 = require("webpack-merge");
var dev_1 = require("./dev");
var module_1 = require("./module");
var plugins_1 = require("./plugins");
var config_1 = require("./utils/config");
var global_1 = require("./utils/global");
var logs_1 = require("./utils/logs");
var params_1 = require("./utils/params");
var CliMain = /** @class */ (function () {
    function CliMain() {
    }
    /** webpack主配置 */
    CliMain.config = __assign(__assign({ mode: params_1.Params.isDev ? "development" : "production", devtool: params_1.Params.isDev ? "eval-source-map" : false, target: ['web', 'es5'], module: module_1.module }, !params_1.Params.speed && { plugins: plugins_1.plugins }), { context: global_1.SRC_PATH, infrastructureLogging: {
            level: 'error',
        }, cache: {
            type: 'filesystem',
        }, entry: function () {
            var entry = {};
            params_1.Params.apps.forEach(function (app) {
                entry[app] = global_1.SRC_PATH + "/" + app + "/index.ts";
            });
            return entry;
        }, output: {
            path: global_1.DIST_PATH,
            filename: "[name]/js/[name].[chunkhash:7].js",
            publicPath: params_1.Params.cdn || "auto",
            uniqueName: params_1.Params.uniqueName,
            chunkFilename: "common/js/[name].[chunkhash:7].bundle.js",
        }, resolve: {
            extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
        }, optimization: {
            minimizer: !params_1.Params.isDev ? [
                new css_minimizer_webpack_plugin_1.default(),
                new terser_webpack_plugin_1.default({
                    extractComments: false,
                }),
            ] : [],
            minimize: !params_1.Params.isDev,
            runtimeChunk: false,
            splitChunks: {
                maxInitialRequests: 3,
                maxAsyncRequests: 5,
                minChunks: 1,
                cacheGroups: {
                    common: {
                        chunks: "initial",
                        name: "common",
                        minSize: 1,
                        test: /([\\/]node_modules[\\/])/,
                        priority: -10,
                    },
                },
            },
        } });
    /** webpack实例 */
    CliMain.compiler = null;
    /** 初始化webpack实例 */
    CliMain.init = function () {
        /** 显示当前构建应用 */
        logs_1.llog("building [" + params_1.Params.apps + "]");
        /** 合并配置 */
        CliMain.config = webpack_merge_1.merge(CliMain.config, config_1.eConfig.webpack);
        /** 初始化 */
        CliMain.compiler = webpack_1.webpack(params_1.Params.speed
            ? webpack_merge_1.merge(new speed_measure_webpack_plugin_1.default(params_1.Params.speed).wrap(CliMain.config), { plugins: plugins_1.plugins })
            : CliMain.config);
        /** 事件监听 */
        var startTime = 0;
        CliMain.compiler.hooks.compile.tap('compile', function () {
            startTime = Date.now();
        });
        CliMain.compiler.hooks.done.tap('done', function () {
            var time = (Date.now() - startTime) / 1000 + "s";
            if (params_1.Params.isDev) {
                logs_1.devBoxLog({
                    time: time,
                    port: dev_1.devServerConfig.port,
                    path: params_1.Params.apps[0]
                });
            }
            else {
                logs_1.llog("build time " + time);
            }
        });
    };
    return CliMain;
}());
exports.CliMain = CliMain;
