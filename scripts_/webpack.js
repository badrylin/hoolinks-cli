"use strict";
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
const speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
const webpack_1 = require("webpack");
const webpack_merge_1 = require("webpack-merge");
const dev_1 = require("./dev");
const module_1 = require("./module");
const plugins_1 = require("./plugins");
const config_1 = require("./utils/config");
const global_1 = require("./utils/global");
const logs_1 = require("./utils/logs");
const params_1 = require("./utils/params");
const esbuild_loader_1 = require("esbuild-loader");
class CliMain {
}
exports.CliMain = CliMain;
/** webpack主配置 */
CliMain.config = Object.assign(Object.assign({ mode: params_1.Params.isDev ? "development" : "production", devtool: params_1.Params.isDev ? "eval-source-map" : false, target: ['web', 'es5'], module: module_1.module }, !params_1.Params.speed && { plugins: plugins_1.plugins }), { ignoreWarnings: [/default\-exporting/], context: global_1.SRC_PATH, infrastructureLogging: {
        level: 'error',
    }, 
    // 暂时弃用文件系统的cache
    // 因为filesystem模式不会自动清除过期的cache文件
    // https://github.com/webpack/webpack/issues/13291
    cache: {
        type: 'filesystem',
        profile: true,
    }, entry: () => {
        const entry = {};
        params_1.Params.apps.forEach((app) => {
            entry[app] = `${global_1.SRC_PATH}/${app}/index.ts`;
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
            new esbuild_loader_1.EsbuildPlugin({
                treeShaking: true,
                keepNames: true,
                legalComments: 'none',
                css: true,
                // target: 'es5',
            }),
        ] : [],
        minimize: true,
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
CliMain.init = () => {
    /** 显示当前构建应用 */
    logs_1.llog(`building [${params_1.Params.apps}]`);
    /** 合并配置 */
    CliMain.config = webpack_merge_1.merge(CliMain.config, config_1.eConfig.webpack);
    /** 初始化 */
    CliMain.compiler = webpack_1.webpack(params_1.Params.speed
        ? webpack_merge_1.merge(new speed_measure_webpack_plugin_1.default(params_1.Params.speed).wrap(CliMain.config), { plugins: plugins_1.plugins })
        : CliMain.config);
    /** 事件监听 */
    let startTime = 0;
    CliMain.compiler.hooks.compile.tap('compile', () => {
        startTime = Date.now();
    });
    CliMain.compiler.hooks.done.tap('done', () => {
        const time = `${(Date.now() - startTime) / 1000}s`;
        if (params_1.Params.isDev) {
            logs_1.devBoxLog({
                time,
                port: dev_1.devServerConfig.port,
                path: params_1.Params.apps[0]
            });
        }
        else {
            logs_1.llog(`build time ${time}`);
        }
    });
};
//# sourceMappingURL=webpack.js.map