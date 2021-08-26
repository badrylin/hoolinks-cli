import path from 'path';
import { util } from 'webpack';
import { CACHE_PATH } from './global';
import { llog } from './logs';
import fs from 'fs';
import del from 'del';

/**
 * 模拟Node的递归找查找文件
 * @param directory 指定递归开始的文件夹
 * @param relativeFilename 相对路径<文件名>
 * @param previousDirectory 外部不做设定, 这个参数记录上一次文件夹位置, 用于检查是否到达文件夹顶层
 * @returns {any}
 */
const emulateNodeRecursiveLookup = (directory: string, relativeFilename: string, previousDirectory?: string) => {
    try {
        const loopUpTarget = path.resolve(directory, relativeFilename);
        return require(loopUpTarget);
    }
    catch (e) {
        directory = path.dirname(directory);
        if (previousDirectory != directory) {
            previousDirectory = directory;
            return emulateNodeRecursiveLookup(directory, relativeFilename, previousDirectory);
        }
        else {
            return null;
        }
    }
}

/**
 * 获取包版本
 * @param vendorName 包名
 */
const getVersion = (vendorName: string) => {
    const packageJson = emulateNodeRecursiveLookup(process.cwd(), `node_modules/${vendorName}/package.json`);
    let vendorVersion = '';
    if (!packageJson) {
        llog(`vendor[${vendorName}] package not found`, 'yellow');
    }
    else {
        vendorVersion = packageJson.version;
    }
    if (!vendorVersion) {
        llog(`vendor[${vendorName}] version is empty`, 'yellow');
    }
    return vendorVersion;
}

/**
 * 根据入口模块和包版本号生产hash
 * @param entry 入口列表
 */
export const createDllHash = (entry: string[]) => {
    const hash = util.createHash("md5")
    const value = entry.reduce((pre, vendorName) => {
        return pre + vendorName + getVersion(vendorName)
    }, '')
    hash.update(value);
    return hash.digest('hex').toString();
}

/**
 * 检测dll模块是否存在
 * @param entry 入口名称
 */
 export const checkDllForHash = (entryName: string, hash): boolean => {
    try {
        const _path = path.resolve(CACHE_PATH, `${entryName}.dll.${hash}.js`)
        // 查找dll文件是否已存在
        const flag = fs.existsSync(_path)
        // 不存在则先清空其他入口名称相同的dll文件
        if (!flag) {
            del.sync([
                path.resolve(CACHE_PATH, `${entryName}.dll.*.js`),
                path.resolve(CACHE_PATH, `${entryName}.dll.*.json`),
            ]);
        }
        return flag
    } catch (e) {
        return false;
    }
}
