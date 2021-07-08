/*
 * @Author: linzeqin
 * @Date: 2021-04-28 23:06:15
 * @description: 用户参数管理并输出
 */
import fs from 'fs';
import { SRC_PATH } from './global';

/** 用户参数 */
export class Params {
    /** 是否为开发环境 */
    static isDev = true;
    /** 构建环境, 默认dev */
    static env: string = 'dev';
    /** 要构建的模块 */
    static apps: string[] = [];
    /** webpack全局变量名 */
    static uniqueName: string;
    /** cdn路径 */
    static cdn: string;
    /** 是否启动打包分析 */
    static report: boolean;
    /** 是否启动打包速度分析 */
    static speed: boolean;

    /** scr目录下的所有入口 */
    private static allEntry = (() => {
        let ls = fs.readdirSync(SRC_PATH);
        return ls.filter((app) => app !== 'common');
    })()

    /** 初始化参数 */
    static init(options: any, isDev) {
        this.isDev = isDev;
        this.env = options.env;
        this.uniqueName = options.uniqueName;
        this.cdn = options.cdn;
        this.report = options.report;
        this.speed = options.speed;
        /** 过滤不匹配的app */
        this.apps = options.apps && (options.apps as string).split(',').filter((app) => {
            return this.allEntry.includes(app)
        }) || [];
        /** 如果没有匹配的app，则打包全部app */
        this.apps.length === 0 && (this.apps = this.allEntry)
    }
}

