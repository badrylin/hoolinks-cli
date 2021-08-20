"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATIC_PATH = exports.CACHE_PATH = exports.DIST_PATH = exports.SRC_PATH = exports.NODE_MODULES_PATH = exports.pkg = exports.ROOT_PATH = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-06-09 16:39:13
 * @description: 全局变量或路径管理
 */
var path_1 = __importDefault(require("path"));
/** 根路径 */
exports.ROOT_PATH = process.cwd();
/** package配置 */
exports.pkg = require(path_1.default.join(exports.ROOT_PATH, './package.json'));
/** 第三方包路径 */
exports.NODE_MODULES_PATH = path_1.default.join(exports.ROOT_PATH, './node_modules');
/** 打包前文件存放路径 */
exports.SRC_PATH = path_1.default.join(exports.ROOT_PATH, './src');
/** 打包后文件存放路径 */
exports.DIST_PATH = path_1.default.join(exports.ROOT_PATH, './dist');
/** dll缓存文件夹路径 */
exports.CACHE_PATH = path_1.default.join(exports.ROOT_PATH, './.cache');
/** 静态文件目录 */
exports.STATIC_PATH = path_1.default.join(exports.ROOT_PATH, './static');
