/*
 * @Author: linzeqin
 * @Date: 2021-06-09 14:19:21
 * @description: html入口文件处理插件
 */
import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DIST_PATH, ROOT_PATH } from "../utils/global";
import { Params } from "../utils/params";

export const htmlPlugin: HtmlWebpackPlugin[] = Params.apps.map(app => {
    return new HtmlWebpackPlugin({
        filename: path.join(DIST_PATH, `${app}/index.html`),
        template: path.join(ROOT_PATH, `./src/${app}/index.html`),
        inject: true,
        chunks: ['common', app],
        chunksSortMode: "auto",

    })
})
