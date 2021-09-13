/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:55
 * @description: 开发环境
 */
import Server from 'webpack-dev-server/lib/Server';
import { eConfig } from './utils/config';
import { STATIC_PATH } from './utils/global';
import { CliMain } from './webpack';

/** devServer默认配置 */
export const devServerConfig = {
    port: 9000,
    client: {
      logging: "error",
      overlay: false,
      progress: true,
    },
    static: {
        directory: STATIC_PATH,
        watch: true,
        publicPath: '/static',
    },
    devMiddleware: {
        stats: 'errors-only',
    },
    ...eConfig.devServer,
};

export const run = () => {
    const devServer = new Server(devServerConfig, CliMain.compiler);
    (async () => {
        await devServer.start();
        process.on('SIGINT', () => {
            process.exit();
        });
    })();
}
