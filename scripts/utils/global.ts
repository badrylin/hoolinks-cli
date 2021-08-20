/*
 * @Author: linzeqin
 * @Date: 2021-06-09 16:39:13
 * @description: 全局变量或路径管理
 */
import path from 'path';

/** 根路径 */
export const ROOT_PATH = process.cwd();

/** package配置 */
export const pkg = require(path.join(ROOT_PATH, './package.json'));

/** 第三方包路径 */
export const NODE_MODULES_PATH = path.join(ROOT_PATH, './node_modules');

/** 打包前文件存放路径 */
export const SRC_PATH = path.join(ROOT_PATH, './src');

/** 打包后文件存放路径 */
export const DIST_PATH = path.join(ROOT_PATH, './dist');

/** dll缓存文件夹路径 */
export const CACHE_PATH = path.join(ROOT_PATH, './.cache');

/** 静态文件目录 */
export const STATIC_PATH = path.join(ROOT_PATH, './static');
