/*
 * @Author: linzeqin
 * @Date: 2021-07-08 11:46:18
 * @description: dll生成, 独立的webpack配置，跟dev和build不同
 */
import { Configuration, webpack, DllPlugin } from "webpack";
import { CACHE_PATH, DIST_PATH, NODE_MODULES_PATH, ROOT_PATH } from "./utils/global";
import { Params } from "./utils/params";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { llog } from "./utils/logs";
import TerserPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { eConfig } from "./utils/config";
import merge from "webpack-merge";

const config: Configuration = {
    mode: 'production',
    cache: false,
    entry: {},
    output: {
        path: CACHE_PATH,
        filename: "[name].dll.[fullhash].js",
        /** 全局变量，防止冲突 */
        library: "[name]_dll_[fullhash]",
    },
    plugins: [
        /** 清空打包文件夹 */
        new CleanWebpackPlugin(),
        new DllPlugin({
            path: path.join(CACHE_PATH, '[name].dll.manifest.json'),
            /** 公开的dll函数的名称，和 output.library保持一致 */
            name: "[name]_dll_[fullhash]",
            format: true,
        }),
        ...Params.report ? [ new BundleAnalyzerPlugin() ] : [],
    ],
    resolve: {
        modules: [ NODE_MODULES_PATH ],
        extensions: [".js"],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
        minimize: true,
    }
};

export default () => {
    const compiler = webpack(
        Params.speed
        ? new SpeedMeasurePlugin(Params.speed).wrap(merge(config, eConfig.dllWebpack))
        : merge(config, eConfig.dllWebpack)
    );
    compiler.run((err, stats) => {
        if (err) {
            llog(err.message, "red");
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            info.errors.forEach((item) => {
                llog(item.message, "red");
            });
        }

        if (stats.hasWarnings()) {
            info.warnings.forEach((item) => {
                llog(item.message, "yellow");
            });
        }

    })
}
