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
exports.cssLoaders = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var path_1 = __importDefault(require("path"));
var params_1 = require("../utils/params");
var cssLoaders = function () {
    /** 开发环境把css插入到文档流中 */
    var styleLoader = params_1.Params.isDev ? "style-loader" : {
        loader: mini_css_extract_plugin_1.default.loader,
        options: {
            publicPath: function (resourcePath, context) {
                if (params_1.Params.cdn) {
                    return params_1.Params.cdn;
                }
                /** 返回模块的相对路径 */
                return path_1.default.relative(path_1.default.dirname(resourcePath), context) + '/';
            },
        }
    };
    /** 普通css文件解析 */
    var cssLoader = "css-loader";
    /** css modules 文件解析 */
    var cssModulesLoader = {
        loader: "css-loader",
        options: {
            esModule: true,
            modules: {
                localIdentName: '[local]-[hash:base64:6]'
            },
            importLoaders: 1,
        }
    };
    /** less 文件解析 */
    var lessLoader = {
        loader: "less-loader",
        options: {
            lessOptions: {
                javascriptEnabled: true,
                relativeUrls: true,
            },
        }
    };
    /** less 文件解析 */
    var postcssLoader = !params_1.Params.isDev ? [{
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        ["postcss-preset-env", "autoprefixer"],
                    ],
                }
            }
        }] : [];
    return [{
            oneOf: [
                {
                    test: /\.modules\.less$/i,
                    use: __spreadArray(__spreadArray([styleLoader, cssModulesLoader], postcssLoader), ['cache-loader', lessLoader]),
                },
                {
                    test: /\.less$/i,
                    use: __spreadArray(__spreadArray([styleLoader, cssLoader], postcssLoader), ['cache-loader', lessLoader]),
                },
                {
                    test: /\.modules\.css$/i,
                    use: __spreadArray([styleLoader, cssModulesLoader], postcssLoader),
                },
                {
                    test: /\.css$/i,
                    use: __spreadArray([styleLoader, cssLoader], postcssLoader),
                },
            ]
        }];
};
exports.cssLoaders = cssLoaders;
