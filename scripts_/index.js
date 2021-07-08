"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:30
 * @description: 入口
 */
var commander_1 = require("commander");
var global_1 = require("./utils/global");
var params_1 = require("./utils/params");
commander_1.program
    .version(global_1.pkg.version);
var env = commander_1.program.createOption('--env [value]', '环境变量');
var apps = commander_1.program.createOption('--apps [value]', '要构建的模块');
var uniqueName = commander_1.program.createOption('--uniqueName [value]', '在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称');
var cdn = commander_1.program.createOption('--cdn [value]', 'js css img等模块cdn域名配置');
var report = commander_1.program.createOption('-s, --report', '启动打包分析');
var speed = commander_1.program.createOption('-p, --speed', '启动打包速度分析');
/** 初始化用户参数，通用 */
var initOption = function (options, isDev) {
    params_1.Params.init(options, isDev);
};
/** 初始化webpack配置, 只适用dev和build，不适用dll */
var initWepack = function () {
    var CliMain = require("./webpack").CliMain;
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
    .action(function (options) {
    initOption(options, true);
    initWepack();
    require("./dev").default();
});
commander_1.program
    .command('build')
    .addOption(env)
    .addOption(apps)
    .addOption(uniqueName)
    .addOption(cdn)
    .addOption(report)
    .addOption(speed)
    .action(function (options) {
    initOption(options, false);
    initWepack();
    require("./build").default();
});
commander_1.program
    .command('dll')
    .addOption(uniqueName)
    .addOption(report)
    .addOption(speed)
    .action(function (options) {
    initOption(options, false);
    require("./dll").default();
});
commander_1.program.parse();
