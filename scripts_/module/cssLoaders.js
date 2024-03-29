"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssLoaders = void 0;
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const global_1 = require("../utils/global");
const params_1 = require("../utils/params");
const cssLoaders = () => {
    /** 开发环境把css插入到文档流中 */
    const styleLoader = params_1.Params.isDev ? "style-loader" : {
        loader: mini_css_extract_plugin_1.default.loader,
        options: {
            publicPath: (resourcePath, context) => {
                if (params_1.Params.cdn) {
                    return params_1.Params.cdn;
                }
                return 'auto';
            },
        }
    };
    /** 普通css文件解析 */
    const cssLoader = "css-loader";
    /** css modules 文件解析 */
    const cssModulesLoader = {
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
    const lessLoader = {
        loader: "less-loader",
        options: {
            lessOptions: {
                javascriptEnabled: true,
                relativeUrls: true,
                modifyVars: global_1.pkg.theme || {},
            },
        }
    };
    /** less 文件解析 */
    const postcssLoader = !params_1.Params.isDev ? [{
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
                    use: [styleLoader, 'cache-loader', cssModulesLoader, ...postcssLoader, lessLoader],
                },
                {
                    test: /\.less$/i,
                    use: [styleLoader, 'cache-loader', cssLoader, ...postcssLoader, lessLoader],
                },
                {
                    test: /\.modules\.css$/i,
                    use: [styleLoader, cssModulesLoader, ...postcssLoader],
                },
                {
                    test: /\.css$/i,
                    use: [styleLoader, cssLoader, ...postcssLoader],
                },
            ]
        }];
};
exports.cssLoaders = cssLoaders;
//# sourceMappingURL=cssLoaders.js.map