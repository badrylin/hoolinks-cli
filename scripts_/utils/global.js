"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsDev = exports.IS_DEV = exports.apps = exports.pkg = exports.DIST_PATH = exports.SRC_PATH = exports.NODE_MODULES_PATH = exports.ROOT_PATH = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
/** 根路径 */
exports.ROOT_PATH = process.cwd();
/** 第三方包路径 */
exports.NODE_MODULES_PATH = path_1.default.join(exports.ROOT_PATH, './node_modules');
/** 打包前文件存放路径 */
exports.SRC_PATH = path_1.default.join(exports.ROOT_PATH, './src');
/** 打包后文件存放路径 */
exports.DIST_PATH = path_1.default.join(exports.ROOT_PATH, './dist');
/** 包配置 */
exports.pkg = require(path_1.default.join(exports.ROOT_PATH, './package.json'));
/** 需要打包的app */
exports.apps = (function () {
    var ls = fs_1.default.readdirSync(exports.SRC_PATH);
    return ls.filter(function (app) { return app !== 'common'; });
})();
/** 判断当前环境是否为开发环境 */
exports.IS_DEV = false;
/** 设置当前环境是开发环境 */
var setIsDev = function (isDev) {
    if (isDev === void 0) { isDev = true; }
    exports.IS_DEV = true;
};
exports.setIsDev = setIsDev;
