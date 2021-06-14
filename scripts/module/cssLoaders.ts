import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from 'path';
import { RuleSetRule, RuleSetUseItem } from 'webpack';
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
                /** 返回模块的相对路径 */
                return path.relative(path.dirname(resourcePath), context) + '/';
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
                use: [styleLoader, cssModulesLoader, ...postcssLoader, lessLoader],
            },
            {
                test: /\.less$/i,
                use: [styleLoader, cssLoader, ...postcssLoader, lessLoader],
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
