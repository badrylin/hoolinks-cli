/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:55
 * @description: 开发环境
 */
import WebpackDevServer from 'webpack-dev-server';
import Server from 'webpack-dev-server/lib/Server';
import { eConfig } from './utils/config';
import { STATIC_PATH } from './utils/global';
import { Params } from './utils/params';
import { CliMain } from './webpack';

/** devServer默认配置 */
export const devServerConfig: WebpackDevServer.Configuration = {
    port: 9000,
    open: Params.apps[0],
    client: {
        // logging: 'warn',
        overlay: false,
        progress: true,
    },
    static: {
        directory: STATIC_PATH,
        watch: true,
        publicPath: '/static',
    },
    devMiddleware: {
        stats: {
            all: false,
            errors: true,
            warnings: true
        },
    },
    ...eConfig.devServer,
};

export const run = () => {
    const devServer = new Server(devServerConfig, CliMain.compiler);
    (async () => {
        await devServer.start();
        // Ctrl + C is super duper slow because it has to close a bunch of fs.watch handles. Let's just skip
        // all that.
        // https://github.com/webpack/webpack-dev-server/issues/1479
        process.on('SIGINT', () => {
            process.exit();
        });
    })();
}
