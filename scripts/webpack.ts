/*
 * @Author: linzeqin
 * @Date: 2021-06-09 17:05:13
 * @description: webpack基础配置
 */
import path from "path";
import { Configuration, webpack } from "webpack";
import { module } from "./module";
import { plugins } from "./plugins";
import { DIST_PATH, ROOT_PATH, SRC_PATH } from "./utils/global";
import { llog } from "./utils/logs";
import { merge } from 'webpack-merge';
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { eConfig } from "./utils/config";
import { devServerConfig } from "./dev";
import { Params } from "./utils/params";
import TerserPlugin from "terser-webpack-plugin";

export class CliMain {
    /** webpack主配置 */
    static config: Configuration = {
        mode: Params.isDev ? "development" : "production",
        devtool: Params.isDev ? "eval-source-map" : false,
        target: ['web', 'es5'],
        module,
        plugins,
        context: SRC_PATH,
        cache: {
            type: 'filesystem',
        },
        entry: () => {
            const entry = {};
            Params.apps.forEach((app) => {
                entry[app] = `${SRC_PATH}/${app}/index.ts`;
            });
            return entry
        },
        output: {
            path: DIST_PATH,
            filename: "[name]/js/[name].[chunkhash:7].js",
            publicPath: Params.cdn || "../",
            uniqueName: Params.uniqueName,
            chunkFilename: "common/js/[name].[chunkhash:7].bundle.js",
        },
        resolve: {
            extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
        },
        optimization: {
            minimizer: !Params.isDev ? [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    extractComments: false,
                }),
            ] : [],
            minimize: !Params.isDev,
            runtimeChunk: false,
            splitChunks: {
                maxInitialRequests: 3,
                maxAsyncRequests: 5,
                minChunks: 1,
                cacheGroups: {
                    common: {
                        chunks: "initial",
                        name: "common",
                        minSize: 1,
                        test: /([\\/]node_modules[\\/])/,
                        priority: -10,
                    },
                },
            },
        },
    };
    /** webpack实例 */
    static compiler = null;
    /** 初始化webpack实例 */
    static init = () => {
        CliMain.compiler = webpack(
            Params.speed
            ? new SpeedMeasurePlugin(Params.speed).wrap(merge(CliMain.config, eConfig.webpack))
            : merge(CliMain.config, eConfig.webpack)
        );
        let startTime = 0;
        CliMain.compiler.hooks.compile.tap('compile', () => {
            llog('打包中...')
            llog(`打包应用[${Params.apps}]`);
            startTime = Date.now()
        })
        CliMain.compiler.hooks.done.tap('done', () => {
            llog(`打包完成，耗时${(Date.now() - startTime) / 1000}s`)
            Params.isDev && llog(`监听本地，http://localhost:${devServerConfig.port}/${Params.apps[0]}`);
        })
    }
}
