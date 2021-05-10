import path from 'path';
import fs from 'fs';

/** 根路径 */
export const ROOT_PATH = process.cwd();

/** 第三方包路径 */
export const NODE_MODULES_PATH = path.join(ROOT_PATH, './node_modules');

/** 打包前文件存放路径 */
export const SRC_PATH = path.join(ROOT_PATH, './src');

/** 打包后文件存放路径 */
export const DIST_PATH = path.join(ROOT_PATH, './dist');

/** 包配置 */
export const pkg = require(path.join(ROOT_PATH, './package.json'));

/** 需要打包的app */
export const apps = (() => {
    let ls = fs.readdirSync(SRC_PATH);
    return ls.filter((app) => app !== 'common');
})()
