/*
 * @Author: linzeqin
 * @Date: 2021-06-09 14:19:40
 * @description: 全局变量管理
 */
import { DefinePlugin } from "webpack";
import { Params } from "../utils/params";

export const definePlugin: DefinePlugin[] = [
    new DefinePlugin({
        '__DEV__': JSON.stringify(Params.isDev),
        'process.env.NODE_ENV': JSON.stringify(Params.env),
        'process.env.environment': JSON.stringify(Params.env),
    })
]
