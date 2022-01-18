import { Configuration, RuleSetConditionAbsolute } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { Options as ESLintPluginOptions } from 'eslint-webpack-plugin';
/** 用户拓展配置列表 */
declare class DefautlConfigEntity {
    /** 开发服务拓展配置 */
    devServer?: WebpackDevServer.Configuration;
    /** webpack拓展配置 */
    webpack?: Configuration;
    /** dll拓展配置 */
    dllWebpack?: Configuration;
    /** tsLoader配置拓展 */
    tsOptions?: {
        [index: string]: any;
    };
    /** tsLoader解析文件拓展 */
    tsInclude?: RuleSetConditionAbsolute[];
    /** babelLoader配置拓展 */
    /** babelLoader解析文件拓展 */
    /** 是否开启eslint检查 */
    eslint?: boolean | ESLintPluginOptions;
}
export declare const eConfig: DefautlConfigEntity;
export {};
