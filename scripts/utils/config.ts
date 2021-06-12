/*
 * @Author: linzeqin
 * @Date: 2021-06-09 16:39:53
 * @description: 用户拓展配置
 */
import { Configuration } from "webpack"
import WebpackDevServer from "webpack-dev-server"
import path from 'path';
import { ROOT_PATH } from "./global";

/** 用户拓展配置列表 */
class DefautlConfigEntity {

    /** webpack拓展配置 */
    webpack?: Configuration = {};

    /** dll拓展配置 */
    dll?: Configuration = {};

    /** 开发服务拓展配置 */
    devServer?: WebpackDevServer.Configuration = {
        port: 9000,
    };

}

export const eConfig: DefautlConfigEntity = {
    ...new DefautlConfigEntity(),
    ...require(path.join(ROOT_PATH, './cli.config.js'))
};
