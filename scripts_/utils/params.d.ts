/** 用户参数 */
export declare class Params {
    /** 是否为开发环境 */
    static isDev: boolean;
    /** 构建环境, 默认dev */
    static env: string;
    /** 要构建的模块 */
    static apps: string[];
    /** webpack全局变量名 */
    static uniqueName: string;
    /** cdn路径 */
    static cdn: string;
    /** 是否启动打包分析 */
    static report: boolean;
    /** 是否启动打包速度分析 */
    static speed: boolean;
    /** scr目录下的所有入口 */
    private static allEntry;
    /** 初始化参数 */
    static init(options: any, isDev: any): void;
}
