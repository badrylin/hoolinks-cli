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
exports.CliMain = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-06-09 17:05:13
 * @description: webpack基础配置
 */
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var module_1 = require("./module");
var plugins_1 = require("./plugins");
var global_1 = require("./utils/global");
var logs_1 = require("./utils/logs");
var webpack_merge_1 = require("webpack-merge");
var speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
var css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
var config_1 = require("./utils/config");
var dev_1 = require("./dev");
var params_1 = require("./utils/params");
var CliMain = /** @class */ (function () {
    function CliMain() {
    }
    /** webpack主配置 */
    CliMain.config = {
        mode: params_1.Params.isDev ? "development" : "production",
        devtool: params_1.Params.isDev ? "eval-source-map" : false,
        module: module_1.module,
        plugins: plugins_1.plugins,
        context: global_1.SRC_PATH,
        entry: function () {
            var entry = {};
            params_1.Params.apps.forEach(function (app) {
                entry[app] = path_1.default.join(global_1.ROOT_PATH, "./src/" + app + "/index.ts");
            });
            return entry;
        },
        output: {
            path: global_1.DIST_PATH,
            filename: "[name]/js/[name].[chunkhash:7].js",
            publicPath: "../",
            uniqueName: params_1.Params.uniqueName,
            chunkFilename: "common/js/[name].[chunkhash:7].bundle.js",
        },
        resolve: {
            extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
        },
        optimization: {
            minimizer: __spreadArray([], !params_1.Params.isDev ? [new css_minimizer_webpack_plugin_1.default()] : []),
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
        },
    };
    /** webpack实例 */
    CliMain.compiler = null;
    /** 初始化webpack实例 */
    CliMain.init = function () {
        CliMain.compiler = webpack_1.webpack(params_1.Params.speed
            ? new speed_measure_webpack_plugin_1.default(params_1.Params.speed).wrap(webpack_merge_1.merge(CliMain.config, config_1.eConfig.webpack))
            : webpack_merge_1.merge(CliMain.config, config_1.eConfig.webpack));
        var startTime = 0;
        CliMain.compiler.hooks.compile.tap('compile', function () {
            logs_1.llog('打包中...');
            logs_1.llog("\u6253\u5305\u5E94\u7528[" + params_1.Params.apps + "]");
            startTime = Date.now();
        });
        CliMain.compiler.hooks.done.tap('done', function () {
            logs_1.llog("\u6253\u5305\u5B8C\u6210\uFF0C\u8017\u65F6" + (Date.now() - startTime) / 1000 + "s");
            logs_1.llog("\u76D1\u542C\u672C\u5730\uFF0Chttp://localhost:" + dev_1.devServerConfig.port + "/");
        });
    };
    return CliMain;
}());
exports.CliMain = CliMain;
