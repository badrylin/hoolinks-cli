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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:30
 * @description: 入口
 */
const commander_1 = require("commander");
const global_1 = require("./utils/global");
const params_1 = require("./utils/params");
commander_1.program
    .version(global_1.pkg.version);
const env = commander_1.program.createOption('--env [value]', '环境变量');
const apps = commander_1.program.createOption('--apps [value]', '要构建的模块');
const uniqueName = commander_1.program.createOption('--uniqueName [value]', '在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称');
const cdn = commander_1.program.createOption('--cdn [value]', 'js css img等模块cdn域名配置');
const report = commander_1.program.createOption('-s, --report', '启动打包分析');
const speed = commander_1.program.createOption('-p, --speed', '启动打包速度分析');
/** 初始化用户参数，通用 */
const initOption = (options, isDev) => {
    params_1.Params.init(options, isDev);
};
/** 初始化webpack配置, 只适用dev和build，不适用dll */
const initWepack = () => {
    const { CliMain } = require("./webpack");
    CliMain.init();
};
commander_1.program
    .command('dev')
    .addOption(env)
    .addOption(apps)
    .addOption(uniqueName)
    .addOption(cdn)
    .addOption(report)
    .addOption(speed)
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    // 初始化用户参数配置
    initOption(options, true);
    // 先验证dll是否已构建
    yield require("./dll").run();
    // 再初始化webpack
    initWepack();
    require("./dev").run();
}));
commander_1.program
    .command('build')
    .addOption(env)
    .addOption(apps)
    .addOption(uniqueName)
    .addOption(cdn)
    .addOption(report)
    .addOption(speed)
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    // 初始化用户参数配置
    initOption(options, false);
    // 先验证dll是否已构建
    yield require("./dll").run();
    // 再初始化配置
    initWepack();
    require("./build").run();
}));
commander_1.program
    .command('dll')
    .addOption(uniqueName)
    .addOption(report)
    .addOption(speed)
    .action((options) => {
    initOption(options, false);
    require("./dll").run();
});
commander_1.program.parse();
