/*
 * @Author: linzeqin
 * @Date: 2021-07-08 11:46:18
 * @description: dll生成, 独立的webpack配置，跟dev和build不同
 */
import { isObject } from "lodash";
import path from "path";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Configuration, DllPlugin, Entry, EntryObject, webpack } from "webpack";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from "webpack-merge";
import WebpackBarPlugin from "webpackbar";
import { eConfig } from "./utils/config";
import { checkDllForHash, createDllHash } from "./utils/dllVersion";
import { CACHE_PATH, NODE_MODULES_PATH } from "./utils/global";
import { llog } from "./utils/logs";
import { Params } from "./utils/params";

/** 创建dll配置 */
const createConfiguration = (entry: Entry, hash: string, dllConfig: Configuration, isLast?: boolean): Configuration => {
    const name = Object.keys(entry);
    const config: Configuration = {
        mode: 'production',
        cache: false,
        target: ['web', 'es5'],
        entry,
        output: {
            path: CACHE_PATH,
            filename: `[name].dll.${hash}.js`,
            /** 全局变量，防止冲突 */
            library: `[name]_dll_${hash}`,
            /** 默认umd模式 */
            libraryTarget: "umd",
        },
        plugins: [
            /** 清空打包文件夹 */
            // ...isLast ? [ new CleanWebpackPlugin() ] : [],
            new WebpackBarPlugin({name: `webpack dll [${name}]`}),
            new DllPlugin({
                path: path.join(CACHE_PATH, '[name].dll.manifest.json'),
                /** 公开的dll函数的名称，和 output.library保持一致 */
                name: `[name]_dll_${hash}`,
                format: true,
            }),
            ...Params.report ? [ new BundleAnalyzerPlugin() ] : [],
        ],
        resolve: {
            modules: [ NODE_MODULES_PATH ],
            extensions: [".js"],
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
            minimize: true,
        }
    }
    return merge(config, dllConfig)
};

/** 多入口dll处理 */
const createMulConfiguration = (): Configuration[] => {
    const { entry, ...dllConfig } = eConfig.dllWebpack;
    const newEntry: Object = (!isObject(entry) ? { verdor: entry } : entry) as EntryObject;
    return Object.entries(newEntry).map(([name, value], index, arr) => {
        try{
            const hash = createDllHash(value as string[])
            /** 检测dll文件是否已存在 */
            if (!checkDllForHash(name, hash)) {
                return createConfiguration({ [name]: value }, hash, dllConfig, index === arr.length - 1)
            } else {
                return null
            }
        }catch(error) {
            llog('dll entry configuration exception', 'yellow')
            return null
        }
    }).filter(i => i)
}

export const run = async () => {
    if (!eConfig.dllWebpack.entry) {
        return
    }
    const mulConfig = createMulConfiguration()
    if (mulConfig.length === 0) {
        llog('skip webpack dll')
        return
    }
    const compilerList = mulConfig.map((config) => webpack(
        Params.speed
        ? new SpeedMeasurePlugin(Params.speed).wrap(config)
        : config
    ));
    await compilerList.reduce(async (pre, next, index) => {
        await pre
        return new Promise<Boolean>((resolve, reject) => {
            next.run((err, stats) => {
                if (err) {
                    llog(err.message, "red");
                    reject(false)
                    return;
                }

                const info = stats.toJson();

                if (stats.hasErrors()) {
                    reject(false)
                    info.errors.forEach((item) => {
                        llog(item.message, "red");
                    });
                }

                if (stats.hasWarnings()) {
                    info.warnings.forEach((item) => {
                        llog(item.message, "yellow");
                    });
                }
                resolve(true)
            })
        })
    }, Promise.resolve(true))
}
