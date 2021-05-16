import path from "path";
import { Configuration, webpack } from "webpack";
import { module } from "./module";
import { plugins } from "./plugins";
import { DIST_PATH, ROOT_PATH, apps, pkg, IS_DEV } from "./utils/global";
import { llog } from "./utils/logs";
import { merge } from 'webpack-merge';
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import { eConfig } from "./utils/config";
import { devServerConfig } from "./dev";

const entry = {};

apps.forEach((app) => {
    entry[app] = path.join(ROOT_PATH, `./src/${app}/index.ts`);
});

/** 主配置 */
const config: Configuration = {
    mode: "production",
    devtool: "eval-source-map",
    entry,
    module,
    plugins,
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
    },
    output: {
        path: DIST_PATH,
        filename: "[name]/js/[name].[chunkhash:7].js",
        publicPath: "../",
        /* uniqueName: `${pkg.name}_[chunkhash:7]`, */
        chunkFilename: "common/js/[name].[chunkhash:7].bundle.js",
    },
    optimization: {
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

export class CliMain {
    /** webpack实例 */
    static compiler = null;
    /** 初始化 */
    static init = () => {
        CliMain.compiler = webpack(
            eConfig.speedTest
            ? new SpeedMeasurePlugin(eConfig.speedTest).wrap(merge(config, eConfig.webpack))
            : merge(config, eConfig.webpack)
        );
        let startTime = 0;
        CliMain.compiler.hooks.compile.tap('compile', () => {
            llog('打包中...')
            startTime = Date.now()
        })
        CliMain.compiler.hooks.done.tap('done', () => {
            llog(`打包完成，耗时${(Date.now() - startTime) / 1000}s`)
            llog(`监听本地，http://localhost:${devServerConfig.port}/`);
        })
    }
}
