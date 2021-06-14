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
var params_1 = require("../utils/params");
var definePlugin_1 = require("./definePlugin");
var htmlPlugin_1 = require("./htmlPlugin");
exports.plugins = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], htmlPlugin_1.htmlPlugin), definePlugin_1.definePlugin), [
    /** 显示打包进度条 */
    new webpackbar_1.default({})
]), params_1.Params.report ? [new webpack_bundle_analyzer_1.BundleAnalyzerPlugin()] : []), params_1.Params.isDev ? [] : []), !params_1.Params.isDev ? [
    /** css文件分离 */
    new mini_css_extract_plugin_1.default({
        filename: function (pathData) {
            return pathData.chunk.name + "/styles/[name].[contenthash:7].css";
        }
    }),
    /** 清空打包文件夹 */
    new clean_webpack_plugin_1.CleanWebpackPlugin({}),
] : []);
