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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
var config_1 = require("../utils/config");
exports.plugins = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], htmlPlugin_1.htmlPlugin, true), definePlugin_1.definePlugin, true), dllPlugin_1.dllPlugin, true), [
    /** 显示打包进度条 */
    new webpackbar_1.default({ name: params_1.Params.isDev ? 'webpack dev' : 'webpack build' })
], false), params_1.Params.report ? [new webpack_bundle_analyzer_1.BundleAnalyzerPlugin()] : [], true), params_1.Params.isDev ? __spreadArray([], config_1.eConfig.eslint ? [new eslint_webpack_plugin_1.default(__assign({ 
        // threads: true,
        cache: true, cacheLocation: path_1.default.resolve(global_1.ESLINT_CACHE_PATH, './index.json'), context: global_1.ROOT_PATH, extensions: ['js', 'jsx', 'ts', 'tsx'], files: params_1.Params.apps.map(function (app) { return path_1.default.resolve(global_1.SRC_PATH, app); }) }, typeof config_1.eConfig.eslint === 'boolean' ? {} : config_1.eConfig.eslint))] : [], true) : [], true), !params_1.Params.isDev ? [
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
] : [], true);
