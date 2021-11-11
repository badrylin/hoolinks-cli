import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from 'path';
import { RuleSetRule, RuleSetUseItem } from 'webpack';
import { pkg } from "../utils/global";
import { Params } from '../utils/params';

export const cssLoaders = (): RuleSetRule[] => {
    /** 开发环境把css插入到文档流中 */
    const styleLoader: RuleSetUseItem = Params.isDev ? "style-loader" : {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: (resourcePath, context) => {
                if (Params.cdn) {
                    return Params.cdn
                }
                return 'auto';
            },
        }
    };
    /** 普通css文件解析 */
    const cssLoader: RuleSetUseItem = "css-loader";
    /** css modules 文件解析 */
    const cssModulesLoader: RuleSetUseItem = {
        loader: "css-loader",
        options: {
            esModule: true,
            modules: {
                localIdentName: '[local]-[hash:base64:6]'
            },
            importLoaders: 1,
        }
    }
    /** less 文件解析 */
    const lessLoader: RuleSetUseItem = {
        loader: "less-loader",
        options: {
            lessOptions: {
                javascriptEnabled: true,
                relativeUrls: true,
                modifyVars: pkg.theme || {},
            },
        }
    }
    /** less 文件解析 */
    const postcssLoader: RuleSetUseItem[] = !Params.isDev ? [{
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
                use: [styleLoader, cssModulesLoader, ...postcssLoader,'cache-loader', lessLoader],
            },
            {
                test: /\.less$/i,
                use: [styleLoader, cssLoader, ...postcssLoader,'cache-loader', lessLoader],
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
    }]
}
