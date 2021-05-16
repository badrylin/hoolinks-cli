/*
 * @Author: linzeqin
 * @Date: 2021-04-28 23:06:15
 * @description: 参数管理并输出
 */

/** 用户参数 */
export class Params {
    /** 构建环境 */
    static env: string;
    /** 要构建的模块 */
    static apps: string;
    /** webpack全局变量名 */
    static uniqueName: string;

    /** 初始化参数 */
    static init(options: any) {
        Params.env = options.env;
        Params.apps = options.apps;
        Params.uniqueName = options.uniqueName;
    }
}

