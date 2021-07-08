/*
 * @Author: linzeqin
 * @Date: 2021-06-09 16:39:53
 * @description: 用户拓展配置
 */
import { Configuration, RuleSetConditionAbsolute, RuleSetRule } from "webpack"
import WebpackDevServer from "webpack-dev-server"
import path from 'path';
import { ROOT_PATH } from "./global";
import fs from 'fs';
import merge from "webpack-merge";

/** 用户拓展配置列表 */
class DefautlConfigEntity {

    /** 开发服务拓展配置 */
    devServer?: WebpackDevServer.Configuration = {
        port: 9000,
    };

    /** webpack拓展配置 */
    webpack?: Configuration = {};

    /** dll拓展配置 */
    dllWebpack?: Configuration = {};

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
let stat = null;
let cliFilePath = path.join(ROOT_PATH, './cli.config.js');

try{
    /** 判断是否有config文件 */
   stat = fs.statSync(cliFilePath)
}catch(err) {}

if (stat) {
    extraConfig = require(cliFilePath)
}

export const eConfig: DefautlConfigEntity = merge(new DefautlConfigEntity(), extraConfig)
