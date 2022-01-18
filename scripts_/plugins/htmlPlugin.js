"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlPlugin = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-06-09 14:19:21
 * @description: html入口文件处理插件
 */
const path_1 = __importDefault(require("path"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const global_1 = require("../utils/global");
const params_1 = require("../utils/params");
exports.htmlPlugin = params_1.Params.apps.map(app => {
    return new html_webpack_plugin_1.default({
        filename: path_1.default.join(global_1.DIST_PATH, `${app}/index.html`),
        template: path_1.default.join(global_1.ROOT_PATH, `./src/${app}/index.html`),
        inject: 'body',
        scriptLoading: 'blocking',
        chunks: ['common', app],
        chunksSortMode: "auto",
    });
});
