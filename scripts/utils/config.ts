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
import { toUpper } from "lodash";
import { Options as ESLintPluginOptions} from 'eslint-webpack-plugin';

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
    // babelOptionss?: { [index: string]: any } = {};

    /** babelLoader解析文件拓展 */
    // babelInclude?: RuleSetConditionAbsolute[] = [];

    /** 是否开启eslint检查 */
    eslint?: boolean | ESLintPluginOptions = true;
}

let extraConfig = {}
let stat = null;
let cliFilePath = path.join(ROOT_PATH, './cli.config.js');

try{
    /** 判断是否有config文件 */
    stat = fs.statSync(cliFilePath)
    if (fs.existsSync(cliFilePath)) {
        extraConfig = require(cliFilePath)
    }
}catch(err) {
    throw err
}

export const eConfig: DefautlConfigEntity = merge(new DefautlConfigEntity(), extraConfig)
