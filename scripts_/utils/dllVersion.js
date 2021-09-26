"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDllForHash = exports.createDllHash = void 0;
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var global_1 = require("./global");
var logs_1 = require("./logs");
var fs_1 = __importDefault(require("fs"));
var del_1 = __importDefault(require("del"));
/**
 * 模拟Node的递归找查找文件
 * @param directory 指定递归开始的文件夹
 * @param relativeFilename 相对路径<文件名>
 * @param previousDirectory 外部不做设定, 这个参数记录上一次文件夹位置, 用于检查是否到达文件夹顶层
 * @returns {any}
 */
var emulateNodeRecursiveLookup = function (directory, relativeFilename, previousDirectory) {
    try {
        var loopUpTarget = path_1.default.resolve(directory, relativeFilename);
        return require(loopUpTarget);
    }
    catch (e) {
        directory = path_1.default.dirname(directory);
        if (previousDirectory != directory) {
            previousDirectory = directory;
            return emulateNodeRecursiveLookup(directory, relativeFilename, previousDirectory);
        }
        else {
            return null;
        }
    }
};
/**
 * 获取包版本
 * @param vendorName 包名
 */
var getVersion = function (vendorName) {
    var packageJson = emulateNodeRecursiveLookup(process.cwd(), "node_modules/" + vendorName + "/package.json");
    var vendorVersion = '';
    if (!packageJson) {
        logs_1.llog("vendor[" + vendorName + "] package not found", 'yellow');
    }
    else {
        vendorVersion = packageJson.version;
    }
    if (!vendorVersion) {
        logs_1.llog("vendor[" + vendorName + "] version is empty", 'yellow');
    }
    return vendorVersion;
};
/**
 * 根据入口模块和包版本号生产hash
 * @param entry 入口列表
 */
var createDllHash = function (entry) {
    var hash = webpack_1.util.createHash("md5");
    var value = entry.reduce(function (pre, vendorName) {
        return pre + vendorName + getVersion(vendorName);
    }, '');
    hash.update(value);
    return hash.digest('hex').toString();
};
exports.createDllHash = createDllHash;
/**
 * 检测dll模块是否存在
 * @param entry 入口名称
 */
var checkDllForHash = function (entryName, hash) {
    try {
        var _path = path_1.default.resolve(global_1.CACHE_PATH, entryName + ".dll." + hash + ".js");
        // 查找dll文件是否已存在
        var flag = fs_1.default.existsSync(_path);
        // 不存在则先清空其他入口名称相同的dll文件
        if (!flag) {
            del_1.default.sync([
                path_1.default.resolve(global_1.CACHE_PATH, entryName + ".dll.*.js"),
                path_1.default.resolve(global_1.CACHE_PATH, entryName + ".dll.*.json"),
            ]);
        }
        return flag;
    }
    catch (e) {
        return false;
    }
};
exports.checkDllForHash = checkDllForHash;
