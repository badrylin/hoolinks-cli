"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliMain = void 0;
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var module_1 = require("./module");
var plugins_1 = require("./plugins");
var global_1 = require("./utils/global");
var logs_1 = require("./utils/logs");
var webpack_merge_1 = require("webpack-merge");
var speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
var config_1 = require("./utils/config");
var dev_1 = require("./dev");
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
        extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
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
var CliMain = /** @class */ (function () {
    function CliMain() {
    }
    /** webpack实例 */
    CliMain.compiler = null;
    /** 初始化 */
    CliMain.init = function () {
        CliMain.compiler = webpack_1.webpack(config_1.eConfig.speedTest
            ? new speed_measure_webpack_plugin_1.default(config_1.eConfig.speedTest).wrap(webpack_merge_1.merge(config, config_1.eConfig.webpack))
            : webpack_merge_1.merge(config, config_1.eConfig.webpack));
        var startTime = 0;
        CliMain.compiler.hooks.compile.tap('compile', function () {
            logs_1.llog('打包中...');
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
