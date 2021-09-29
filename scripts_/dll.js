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
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
const webpack_1 = require("webpack");
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const webpackbar_1 = __importDefault(require("webpackbar"));
const config_1 = require("./utils/config");
const dllVersion_1 = require("./utils/dllVersion");
const global_1 = require("./utils/global");
const logs_1 = require("./utils/logs");
const params_1 = require("./utils/params");
/** 创建dll配置 */
const createConfiguration = (entry, hash, dllConfig, isLast) => {
    const name = Object.keys(entry);
    const config = {
        mode: 'production',
        cache: false,
        target: ['web', 'es5'],
        entry,
        output: {
            path: global_1.CACHE_PATH,
            filename: `[name].dll.${hash}.js`,
            /** 全局变量，防止冲突 */
            library: `[name]_dll_${hash}`,
            /** 默认umd模式 */
            libraryTarget: "umd",
        },
        plugins: [
            /** 清空打包文件夹 */
            // ...isLast ? [ new CleanWebpackPlugin() ] : [],
            new webpackbar_1.default({ name: `webpack dll [${name}]` }),
            new webpack_1.DllPlugin({
                path: path_1.default.join(global_1.CACHE_PATH, '[name].dll.manifest.json'),
                /** 公开的dll函数的名称，和 output.library保持一致 */
                name: `[name]_dll_${hash}`,
                format: true,
            }),
            ...params_1.Params.report ? [new webpack_bundle_analyzer_1.BundleAnalyzerPlugin()] : [],
        ],
        // resolve: {
        //     modules: [ NODE_MODULES_PATH ],
        //     extensions: [".js"],
        // },
        optimization: {
            minimizer: [
                new terser_webpack_plugin_1.default({
                    extractComments: false,
                }),
            ],
            minimize: true,
        }
    };
    return (0, webpack_merge_1.default)(config, dllConfig);
};
/** 多入口dll处理 */
const createMulConfiguration = () => {
    const _a = config_1.eConfig.dllWebpack, { entry } = _a, dllConfig = __rest(_a, ["entry"]);
    const newEntry = (!(0, lodash_1.isObject)(entry) ? { verdor: entry } : entry);
    return Object.entries(newEntry).map(([name, value], index, arr) => {
        try {
            const hash = (0, dllVersion_1.createDllHash)(value);
            /** 检测dll文件是否已存在 */
            if (!(0, dllVersion_1.checkDllForHash)(name, hash)) {
                return createConfiguration({ [name]: value }, hash, dllConfig, index === arr.length - 1);
            }
            else {
                return null;
            }
        }
        catch (error) {
            (0, logs_1.llog)('dll entry configuration exception', 'yellow');
            return null;
        }
    }).filter(i => i);
};
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!config_1.eConfig.dllWebpack.entry) {
        return;
    }
    const mulConfig = createMulConfiguration();
    if (mulConfig.length === 0) {
        (0, logs_1.llog)('skip webpack dll');
        return;
    }
    const compilerList = mulConfig.map((config) => (0, webpack_1.webpack)(params_1.Params.speed
        ? new speed_measure_webpack_plugin_1.default(params_1.Params.speed).wrap(config)
        : config));
    yield compilerList.reduce((pre, next, index) => __awaiter(void 0, void 0, void 0, function* () {
        yield pre;
        return new Promise((resolve, reject) => {
            next.run((err, stats) => {
                if (err) {
                    (0, logs_1.llog)(err.message, "red");
                    reject(false);
                    return;
                }
                const info = stats.toJson();
                if (stats.hasErrors()) {
                    reject(false);
                    info.errors.forEach((item) => {
                        (0, logs_1.llog)(item.message, "red");
                    });
                }
                if (stats.hasWarnings()) {
                    info.warnings.forEach((item) => {
                        (0, logs_1.llog)(item.message, "yellow");
                    });
                }
                resolve(true);
            });
        });
    }), Promise.resolve(true));
});
exports.run = run;
