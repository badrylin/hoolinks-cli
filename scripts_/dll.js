"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
/*
 * @Author: linzeqin
 * @Date: 2021-07-08 11:46:18
 * @description: dll生成, 独立的webpack配置，跟dev和build不同
 */
var webpack_1 = require("webpack");
var global_1 = require("./utils/global");
var params_1 = require("./utils/params");
var speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var logs_1 = require("./utils/logs");
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var config_1 = require("./utils/config");
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var lodash_1 = require("lodash");
var dllVersion_1 = require("./utils/dllVersion");
var webpackbar_1 = __importDefault(require("webpackbar"));
/** 创建dll配置 */
var createConfiguration = function (entry, hash, dllConfig, isLast) {
    var name = Object.keys(entry);
    var config = {
        mode: 'production',
        cache: false,
        entry: entry,
        output: {
            path: global_1.CACHE_PATH,
            filename: "[name].dll." + hash + ".js",
            /** 全局变量，防止冲突 */
            library: "[name]_dll_" + hash,
            /** 默认umd模式 */
            libraryTarget: "umd",
        },
        plugins: __spreadArray([
            /** 清空打包文件夹 */
            // ...isLast ? [ new CleanWebpackPlugin() ] : [],
            new webpackbar_1.default({ name: "webpack dll [" + name + "]" }),
            new webpack_1.DllPlugin({
                path: path_1.default.join(global_1.CACHE_PATH, '[name].dll.manifest.json'),
                /** 公开的dll函数的名称，和 output.library保持一致 */
                name: "[name]_dll_" + hash,
                format: true,
            })
        ], params_1.Params.report ? [new webpack_bundle_analyzer_1.BundleAnalyzerPlugin()] : []),
        resolve: {
            modules: [global_1.NODE_MODULES_PATH],
            extensions: [".js"],
        },
        optimization: {
            minimizer: [
                new terser_webpack_plugin_1.default({
                    extractComments: false,
                }),
            ],
            minimize: true,
        }
    };
    return webpack_merge_1.default(config, dllConfig);
};
/** 多入口dll处理 */
var createMulConfiguration = function () {
    var _a = config_1.eConfig.dllWebpack, entry = _a.entry, dllConfig = __rest(_a, ["entry"]);
    var newEntry = (!lodash_1.isObject(entry) ? { verdor: entry } : entry);
    return Object.entries(newEntry).map(function (_a, index, arr) {
        var _b;
        var name = _a[0], value = _a[1];
        try {
            var hash = dllVersion_1.createDllHash(value);
            /** 检测dll文件是否已存在 */
            if (!dllVersion_1.checkDllForHash(name, hash)) {
                return createConfiguration((_b = {}, _b[name] = value, _b), hash, dllConfig, index === arr.length - 1);
            }
            else {
                return null;
            }
        }
        catch (error) {
            logs_1.llog('dll entry configuration exception', 'yellow');
            return null;
        }
    }).filter(function (i) { return i; });
};
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mulConfig, compilerList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config_1.eConfig.dllWebpack.entry) {
                    return [2 /*return*/];
                }
                mulConfig = createMulConfiguration();
                if (mulConfig.length === 0) {
                    logs_1.llog('skip webpack dll');
                    return [2 /*return*/];
                }
                compilerList = mulConfig.map(function (config) { return webpack_1.webpack(params_1.Params.speed
                    ? new speed_measure_webpack_plugin_1.default(params_1.Params.speed).wrap(config)
                    : config); });
                return [4 /*yield*/, compilerList.reduce(function (pre, next, index) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, pre];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, new Promise(function (resolve, reject) {
                                            next.run(function (err, stats) {
                                                if (err) {
                                                    logs_1.llog(err.message, "red");
                                                    reject(false);
                                                    return;
                                                }
                                                var info = stats.toJson();
                                                if (stats.hasErrors()) {
                                                    reject(false);
                                                    info.errors.forEach(function (item) {
                                                        logs_1.llog(item.message, "red");
                                                    });
                                                }
                                                if (stats.hasWarnings()) {
                                                    info.warnings.forEach(function (item) {
                                                        logs_1.llog(item.message, "yellow");
                                                    });
                                                }
                                                resolve(true);
                                            });
                                        })];
                            }
                        });
                    }); }, Promise.resolve(true))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.run = run;
