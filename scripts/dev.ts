/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:55
 * @description: 开发环境
 */
import webpackDevServer from 'webpack-dev-server';
import { eConfig } from './utils/config';
import { SRC_PATH } from './utils/global';
import { llog } from './utils/logs';
import { CliMain } from './webpack';

export const devServerConfig: webpackDevServer.Configuration = {
    contentBase: SRC_PATH,
    /* open: true, */
    stats: 'errors-only',
    noInfo: true,
    port: 9000,
    hot: true,
    ...eConfig.devServer,
}

export default () => {
    // @ts-ignore
    new webpackDevServer(CliMain.compiler, devServerConfig).listen(devServerConfig.port, (error) => {
        llog(error, 'red');
    })
}
