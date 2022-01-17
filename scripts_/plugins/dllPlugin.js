"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dllPlugin = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-06-09 14:19:21
 * @description: html入口文件处理插件
 */
const webpack_1 = require("webpack");
const path_1 = __importDefault(require("path"));
const global_1 = require("../utils/global");
const add_asset_html_webpack_plugin_1 = __importDefault(require("add-asset-html-webpack-plugin"));
const params_1 = require("../utils/params");
const config_1 = require("../utils/config");
const lodash_1 = require("lodash");
exports.dllPlugin = config_1.eConfig.dllWebpack.entry ? [
    /** 按dll入口文件映射manifest文件 */
    ...lodash_1.isObject(config_1.eConfig.dllWebpack.entry) && Object.keys(config_1.eConfig.dllWebpack.entry).map((name) => {
        return new webpack_1.DllReferencePlugin({
            context: global_1.ROOT_PATH,
            manifest: require(path_1.default.join(global_1.CACHE_PATH, `${name}.dll.manifest.json`)),
        });
    }),
    /** 把dll文件添加到html入口中 */
    new add_asset_html_webpack_plugin_1.default({
        outputPath: 'common/js',
        publicPath: params_1.Params.cdn ? `${params_1.Params.cdn}/common/js` : '../common/js',
        filepath: path_1.default.join(global_1.CACHE_PATH, './*.dll.*.js'),
    }),
] : [];
//# sourceMappingURL=dllPlugin.js.map