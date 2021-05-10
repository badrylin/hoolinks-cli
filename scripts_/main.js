"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackCompiler = void 0;
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var module_1 = require("./module");
var plugins_1 = require("./plugins");
var global_1 = require("./utils/global");
var logs_1 = require("./utils/logs");
var webpack_merge_1 = require("webpack-merge");
var speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
var config_1 = require("./utils/config");
var entry = {};
global_1.apps.forEach(function (app) {
    entry[app] = path_1.default.join(global_1.ROOT_PATH, "./src/" + app + "/index.ts");
});
/** 主配置 */
var config = {
    mode: "production",
    devtool: "eval-source-map",
    entry: entry,
    module: module_1.module,
    plugins: plugins_1.plugins,
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx", ".jsx"]
    },
    output: {
        path: global_1.DIST_PATH,
        filename: "[name]/js/[name].[chunkhash:7].js",
        publicPath: "../",
        /* uniqueName: `${pkg.name}_[chunkhash:7]`, */
        chunkFilename: "common/js/[name].[chunkhash:7].bundle.js",
    },
    optimization: {
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
var webpackCompiler = webpack_1.webpack(config_1.eConfig.speedTest
    ? new speed_measure_webpack_plugin_1.default(config_1.eConfig.speedTest).wrap(webpack_merge_1.merge(config, config_1.eConfig.webpack))
    : webpack_merge_1.merge(config, config_1.eConfig.webpack));
exports.webpackCompiler = webpackCompiler;
var startTime = 0;
webpackCompiler.hooks.compile.tap('compile', function () {
    logs_1.llog('打包中...');
    startTime = Date.now();
});
webpackCompiler.hooks.done.tap('done', function () {
    logs_1.llog("\u6253\u5305\u5B8C\u6210\uFF0C\u8017\u65F6" + (Date.now() - startTime) / 1000 + "s");
    /* llog(`监听本地，http://localhost:${devServer.port}/`); */
});
