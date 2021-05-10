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
var webpack_1 = require("webpack");
var webpackbar_1 = __importDefault(require("webpackbar"));
var htmlPlugin_1 = require("./htmlPlugin");
exports.plugins = __spreadArray(__spreadArray([], htmlPlugin_1.htmlPlugin), [
    new clean_webpack_plugin_1.CleanWebpackPlugin({}),
    new webpackbar_1.default({}),
    new webpack_1.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev'),
    })
]);
