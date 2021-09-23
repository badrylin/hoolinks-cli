import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackBar from "webpackbar";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Params } from "../utils/params";
import { definePlugin } from "./definePlugin";
import { dllPlugin } from "./dllPlugin";
import { htmlPlugin } from "./htmlPlugin";
import { CACHE_PATH, DIST_PATH, ESLINT_CACHE_PATH, NODE_MODULES_PATH, ROOT_PATH, SRC_PATH, STATIC_PATH } from "../utils/global";
import path from "path";
import ESLintPlugin from 'eslint-webpack-plugin';
import { eConfig } from "../utils/config";

export const plugins: Configuration['plugins'] = [
    ...htmlPlugin,
    ...definePlugin,
    ...dllPlugin,
    /** 显示打包进度条 */
    new WebpackBar({ name: Params.isDev ? 'webpack dev' : 'webpack build'}),
    /** 打包分析 */
    ...Params.report ? [ new BundleAnalyzerPlugin() ] : [],
    /** 开发环境专用插件 */
    ...Params.isDev ? [
        ...eConfig.eslint ? [new ESLintPlugin({
            // threads: true,
            cache: true,
            cacheLocation: path.resolve(ESLINT_CACHE_PATH, './index.json'),
            context: ROOT_PATH,
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            files: Params.apps.map((app) => path.resolve(SRC_PATH, app)),
            ...typeof eConfig.eslint === 'boolean' ? {} : eConfig.eslint,
        })] : [],
    ] : [],
    /** 生产环境专用插件 */
    ...!Params.isDev ? [
        /** css文件分离 */
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: (pathData) => {
                return `${pathData.chunk.name}/styles/[name].[contenthash:7].css`
            }
        }),
        /** 拷贝静态文件 */
        new CopyWebpackPlugin({
            patterns: [{
                from: STATIC_PATH,
                to: path.resolve(DIST_PATH, './static'),
                globOptions: {ignore: ['.*']},
            }]
        }),
        /** 清空打包文件夹 */
        new CleanWebpackPlugin({}),

    ] : [],
]
