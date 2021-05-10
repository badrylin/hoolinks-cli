"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:30
 * @description: 入口
 */
var build_1 = require("./build");
var dev_1 = require("./dev");
var commander_1 = require("commander");
var global_1 = require("./utils/global");
var parameter_1 = require("./utils/parameter");
commander_1.program
    .version(global_1.pkg.version);
var env = commander_1.program.createOption('--env [value]', '环境变量');
var apps = commander_1.program.createOption('--apps [value]', '要构建的模块');
var uniqueName = commander_1.program.createOption('--uniqueName [value]', '在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称');
var optionAction = function (options) {
    parameter_1.parameter.init(options);
    process.env.NODE_ENV = options.env;
};
commander_1.program
    .command('dev')
    .addOption(env)
    .addOption(apps)
    .addOption(uniqueName)
    .action(function (options) {
    optionAction(options);
    dev_1.runDev();
});
commander_1.program
    .command('build')
    .addOption(env)
    .addOption(apps)
    .addOption(uniqueName)
    .action(function (options) {
    optionAction(options);
    build_1.runBuild();
});
commander_1.program.parse();
