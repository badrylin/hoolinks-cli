"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eConfig = void 0;
var path_1 = __importDefault(require("path"));
var global_1 = require("./global");
var fs_1 = __importDefault(require("fs"));
var webpack_merge_1 = __importDefault(require("webpack-merge"));
/** 用户拓展配置列表 */
var DefautlConfigEntity = /** @class */ (function () {
    function DefautlConfigEntity() {
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
    }
    return DefautlConfigEntity;
}());
var extraConfig = {};
var stat = null;
var cliFilePath = path_1.default.join(global_1.ROOT_PATH, './cli.config.js');
try {
    /** 判断是否有config文件 */
    stat = fs_1.default.statSync(cliFilePath);
}
catch (err) { }
if (stat) {
    extraConfig = require(cliFilePath);
}
exports.eConfig = webpack_merge_1.default(new DefautlConfigEntity(), extraConfig);
