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
var report = commander_1.program.createOption('-s, --report', '启动打包分析');
var speed = commander_1.program.createOption('-t, --speed', '启动打包速度分析');
var optionAction = function (options, isDev) {
    /** 存储用户参数 */
    params_1.Params.init(options, isDev);
    /** 初始化webpack配置 */
    var CliMain = require("./webpack").CliMain;
    CliMain.init();
};
commander_1.program
    .command('dev')
    .addOption(env)
    .addOption(apps)
    .addOption(uniqueName)
    .addOption(report)
    .addOption(speed)
    .action(function (options) {
    optionAction(options, true);
    require("./dev").default();
});
commander_1.program
    .command('build')
    .addOption(env)
    .addOption(apps)
    .addOption(uniqueName)
    .addOption(report)
    .addOption(speed)
    .action(function (options) {
    optionAction(options, false);
    require("./build").default();
});
commander_1.program.parse();
