/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:55
 * @description: 开发环境
 */
import webpackDevServer from 'webpack-dev-server';
import { eConfig } from './utils/config';
import { DIST_PATH, SRC_PATH } from './utils/global';
import { llog } from './utils/logs';
import { Params } from './utils/params';
import { CliMain } from './webpack';

/** devServer默认配置 */
export const devServerConfig: webpackDevServer.Configuration = {
    contentBase: DIST_PATH,
    open: true,
    stats: 'errors-only',
    noInfo: true,
    port: 9000,
    hot: true,
    openPage: Params.apps[0] + '/',
    ...eConfig.devServer,
}

export default () => {
    /** 添加入口点 */
    webpackDevServer.addDevServerEntrypoints(CliMain.config, devServerConfig)
    /** 启动devServer */
    new webpackDevServer(CliMain.compiler, devServerConfig).listen(devServerConfig.port, (error) => {
        llog(error, 'red');
    })
}
