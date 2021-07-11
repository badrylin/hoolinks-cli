/*
 * @Author: linzeqin
 * @Date: 2021-06-09 14:19:21
 * @description: html入口文件处理插件
 */
import { DllReferencePlugin } from "webpack";
import path from "path";
import { CACHE_PATH, DIST_PATH, ROOT_PATH } from "../utils/global";
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import { Configuration } from "webpack";
import { Params } from "../utils/params";
import { eConfig } from "../utils/config";
import { isObject } from "lodash";

export const dllPlugin: Configuration['plugins'] = eConfig.dllWebpack.entry ? [
    /** 按dll入口文件映射manifest文件 */
    ...isObject(eConfig.dllWebpack.entry) && Object.keys(eConfig.dllWebpack.entry).map((name) => {
        return new DllReferencePlugin({
            context: ROOT_PATH,
            manifest: require(path.join(CACHE_PATH, 'verdor.dll.manifest.json')),
        })
    }),
    /** 把dll文件添加到html入口中 */
    new AddAssetHtmlPlugin({
        outputPath: 'common/js',
        publicPath: Params.cdn ? `${Params.cdn}/common/js` : '../common/js',
        filepath: path.join(CACHE_PATH, './*.dll.*.js'),
    }),
] : []
