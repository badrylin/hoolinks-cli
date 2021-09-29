"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eConfig = void 0;
const path_1 = __importDefault(require("path"));
const global_1 = require("./global");
const fs_1 = __importDefault(require("fs"));
const webpack_merge_1 = __importDefault(require("webpack-merge"));
/** 用户拓展配置列表 */
class DefautlConfigEntity {
    constructor() {
        /** 开发服务拓展配置 */
        this.devServer = {
            port: 9000,
        };
        /** webpack拓展配置 */
        this.webpack = {};
        /** dll拓展配置 */
        this.dllWebpack = {};
        /** tsLoader配置拓展 */
        this.tsOptions = {};
        /** tsLoader解析文件拓展 */
        this.tsInclude = [];
        /** babelLoader配置拓展 */
        this.babelOptions = {};
        /** babelLoader解析文件拓展 */
        this.babelInclude = [];
        /** 是否开启eslint检查 */
        this.eslint = true;
    }
}
let extraConfig = {};
let stat = null;
let cliFilePath = path_1.default.join(global_1.ROOT_PATH, './cli.config.js');
try {
    /** 判断是否有config文件 */
    stat = fs_1.default.statSync(cliFilePath);
    if (fs_1.default.existsSync(cliFilePath)) {
        extraConfig = require(cliFilePath);
    }
}
catch (err) { }
exports.eConfig = (0, webpack_merge_1.default)(new DefautlConfigEntity(), extraConfig);
