/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:55
 * @description: 开发环境
 */
import webpackDevServer from 'webpack-dev-server';
import { webpackCompiler } from './main';
import { eConfig } from './utils/config';
import { SRC_PATH } from './utils/global';
import { llog } from './utils/logs';

const devServer: webpackDevServer.Configuration = {
    contentBase: SRC_PATH,
    /* open: true, */
    stats: 'errors-only',
    noInfo: true,
    port: 9000,
    hot: true,
    ...eConfig.devServer,
}

export const runDev = () => {
    // @ts-ignore
    const wds = new webpackDevServer(webpackCompiler, devServer).listen(devServer.port, (error) => {
        llog(error, 'red');
    })
}
