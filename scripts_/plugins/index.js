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
exports.plugins = void 0;
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var webpackbar_1 = __importDefault(require("webpackbar"));
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var params_1 = require("../utils/params");
var definePlugin_1 = require("./definePlugin");
var dllPlugin_1 = require("./dllPlugin");
var htmlPlugin_1 = require("./htmlPlugin");
var global_1 = require("../utils/global");
var path_1 = __importDefault(require("path"));
exports.plugins = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], htmlPlugin_1.htmlPlugin), definePlugin_1.definePlugin), dllPlugin_1.dllPlugin), [
    /** 显示打包进度条 */
    new webpackbar_1.default({ name: params_1.Params.isDev ? 'webpack dev' : 'webpack build' })
]), params_1.Params.report ? [new webpack_bundle_analyzer_1.BundleAnalyzerPlugin()] : []), params_1.Params.isDev ? [] : []), !params_1.Params.isDev ? [
    /** css文件分离 */
    new mini_css_extract_plugin_1.default({
        ignoreOrder: true,
        filename: function (pathData) {
            return pathData.chunk.name + "/styles/[name].[contenthash:7].css";
        }
    }),
    /** 拷贝静态文件 */
    new copy_webpack_plugin_1.default({
        patterns: [{
                from: global_1.STATIC_PATH,
                to: path_1.default.resolve(global_1.DIST_PATH, './static'),
                globOptions: { ignore: ['.*'] },
            }]
    }),
    /** 清空打包文件夹 */
    new clean_webpack_plugin_1.CleanWebpackPlugin({}),
] : []);
