"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const webpackbar_1 = __importDefault(require("webpackbar"));
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const params_1 = require("../utils/params");
const definePlugin_1 = require("./definePlugin");
const dllPlugin_1 = require("./dllPlugin");
const htmlPlugin_1 = require("./htmlPlugin");
const global_1 = require("../utils/global");
const path_1 = __importDefault(require("path"));
const eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
const config_1 = require("../utils/config");
exports.plugins = [
    ...htmlPlugin_1.htmlPlugin,
    ...definePlugin_1.definePlugin,
    ...dllPlugin_1.dllPlugin,
    /** 显示打包进度条 */
    new webpackbar_1.default({ name: params_1.Params.isDev ? 'webpack dev' : 'webpack build' }),
    /** 打包分析 */
    params_1.Params.report && new webpack_bundle_analyzer_1.BundleAnalyzerPlugin(),
    /* ---------------- 开发环境专用插件 ---------------- */
    /* 开启eslint */
    params_1.Params.isDev && config_1.eConfig.eslint && new eslint_webpack_plugin_1.default(Object.assign({ 
        // threads: true,
        cache: true, cacheLocation: path_1.default.resolve(global_1.ESLINT_CACHE_PATH, './index.json'), context: global_1.ROOT_PATH, extensions: ['js', 'jsx', 'ts', 'tsx'], files: params_1.Params.apps.map((app) => path_1.default.resolve(global_1.SRC_PATH, app)) }, typeof config_1.eConfig.eslint === 'boolean' ? {} : config_1.eConfig.eslint)),
    /* react热更新 */
    // Params.isDev && new ReactRefreshWebpackPlugin(),
    /* ---------------- 生产环境专用插件 ---------------- */
    /** css文件分离 */
    !params_1.Params.isDev && new mini_css_extract_plugin_1.default({
        ignoreOrder: true,
        filename: (pathData) => {
            return `${pathData.chunk.name}/styles/[name].[contenthash:7].css`;
        }
    }),
    /** 拷贝静态文件 */
    !params_1.Params.isDev && new copy_webpack_plugin_1.default({
        patterns: [{
                from: global_1.STATIC_PATH,
                to: path_1.default.resolve(global_1.DIST_PATH, './static'),
                globOptions: { ignore: ['.*'] },
                noErrorOnMissing: true,
            }],
    }),
    /** 清空打包文件夹 */
    !params_1.Params.isDev && new clean_webpack_plugin_1.CleanWebpackPlugin({}),
].filter(Boolean);
//# sourceMappingURL=index.js.map