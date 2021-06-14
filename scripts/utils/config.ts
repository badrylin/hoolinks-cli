/*
 * @Author: linzeqin
 * @Date: 2021-06-09 16:39:53
 * @description: 用户拓展配置
 */
import { Configuration, RuleSetConditionAbsolute, RuleSetRule } from "webpack"
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

    /** tsLoader配置拓展 */
    tsOptions?: { [index: string]: any } = {};

    /** tsLoader解析文件拓展 */
    tsInclude?: RuleSetConditionAbsolute[] = [];

    /** babelLoader配置拓展 */
    babelOptions?: { [index: string]: any } = {};

    /** babelLoader解析文件拓展 */
    babelInclude?: RuleSetConditionAbsolute[] = [];

}

let extraConfig = {}
try {
    extraConfig = require(path.join(ROOT_PATH, './cli.config.js'))
} catch (error) {}

export const eConfig: DefautlConfigEntity = {
    ...new DefautlConfigEntity(),
    ...extraConfig,
};
