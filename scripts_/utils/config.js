"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eConfig = void 0;
var path_1 = __importDefault(require("path"));
var global_1 = require("./global");
/** 用户拓展配置列表 */
var DefautlConfigEntity = /** @class */ (function () {
    function DefautlConfigEntity() {
        /** webpack拓展配置 */
        this.webpack = {};
        /** dll拓展配置 */
        this.dll = {};
        /** 开发服务拓展配置 */
        this.devServer = {
            port: 9000,
        };
    }
    return DefautlConfigEntity;
}());
exports.eConfig = __assign(__assign({}, new DefautlConfigEntity()), require(path_1.default.join(global_1.ROOT_PATH, './cli.config.js')));
