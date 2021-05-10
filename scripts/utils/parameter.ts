/*
 * @Author: linzeqin
 * @Date: 2021-04-28 23:06:15
 * @description: 参数管理并输出
 */
import { Configuration, DefinePlugin } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import path from "path";
import { ROOT_PATH } from "./global";
import { webpackCompiler } from "../main";

/** 用户拓展配置列表 */
class Parameter {
    /** 构建环境 */
    env: string = "dev";
    /** 要构建的模块 */
    apps: string;
    /** webpack全局变量名 */
    uniqueName: string;

    /** 初始化参数 */
    init(options: Parameter = new Parameter()) {
        const o = {...new Parameter(), ...options}
        this.env = o.env;
        this.apps = o.apps;
        this.uniqueName = o.uniqueName;
        /** 注册全局变量 */
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(o.env),
            'process.env.environment': JSON.stringify(o.env),
            'process.env.apps': JSON.stringify(o.apps),
            'process.env.uniqueName': JSON.stringify(o.uniqueName),
        }).apply(webpackCompiler)
    }
}

export const parameter = new Parameter();
