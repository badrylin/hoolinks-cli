/*
 * @Author: linzeqin
 * @Date: 2021-06-09 17:05:13
 * @description: webpack基础配置
 */
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Compiler, Configuration, webpack } from "webpack";
import { merge } from 'webpack-merge';
import { devServerConfig } from "./dev";
import { module } from "./module";
import { plugins } from "./plugins";
import { eConfig } from "./utils/config";
import { DIST_PATH, ROOT_PATH, SRC_PATH } from "./utils/global";
import { devBoxLog, llog } from "./utils/logs";
import { Params } from "./utils/params";

export class CliMain {
    /** webpack主配置 */
    static config: Configuration = {
        mode: Params.isDev ? "development" : "production",
        devtool: Params.isDev ? "eval-source-map" : false,
        target: ['web', 'es5'],
        module,
        plugins,
        context: SRC_PATH,
        infrastructureLogging: {
            level: 'error',
        },
        // 暂时弃用文件系统的cache
        // 因为filesystem模式不会自动清除过期的cache文件
        // https://github.com/webpack/webpack/issues/13291
        // cache: {
        //     type: 'filesystem',
        //     profile: true,
        //     maxAge: 1000 * 60,
        // },
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
            publicPath: Params.cdn || "auto",
            uniqueName: Params.uniqueName,
            chunkFilename: "common/js/[name].[chunkhash:7].bundle.js",
        },
        resolve: {
            extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
        },
        optimization: {
            minimizer: !Params.isDev ? [
                new CssMinimizerPlugin({
                    parallel: true,
                }),
                new TerserPlugin({
                    extractComments: false,
                    parallel: true,
                    terserOptions: {
                        keep_fnames: true,
                        keep_classnames: true
                    }
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
    static compiler: Compiler = null;
    /** 初始化webpack实例 */
    static init = () => {
        /** 显示当前构建应用 */
        llog(`building [${Params.apps}]`);
        /** 合并配置 */
        CliMain.config = merge(CliMain.config, eConfig.webpack)
        /** 初始化 */
        CliMain.compiler = webpack(
            Params.speed
            ? merge(new SpeedMeasurePlugin(Params.speed).wrap(CliMain.config),{})
            : CliMain.config
        );
        /** 事件监听 */
        let startTime = 0;
        CliMain.compiler.hooks.compile.tap('compile', () => {
            startTime = Date.now()
        })
        CliMain.compiler.hooks.done.tap('done', () => {
            const time = `${(Date.now() - startTime) / 1000}s`
            if (Params.isDev) {
                devBoxLog({
                    time,
                    port: devServerConfig.port,
                    path: Params.apps[0]
                })
            } else {
                llog(`build time ${time}`)
            }
        })
    }
}
