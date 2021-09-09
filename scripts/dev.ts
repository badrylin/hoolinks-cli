/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:55
 * @description: 开发环境
 */
import Server from 'webpack-dev-server/lib/Server';
import { eConfig } from './utils/config';
import { ROOT_PATH, STATIC_PATH } from './utils/global';
import { llog } from './utils/logs';
import { Params } from './utils/params';
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
        directory: ROOT_PATH,
        watch: true,
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
