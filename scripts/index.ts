/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:30
 * @description: 入口
 */
import { runBuild } from "./build";
import { runDev } from "./dev";
import { program } from 'commander';
import { pkg } from "./utils/global";
import { parameter } from "./utils/parameter";
import { DefinePlugin } from "webpack";
import { webpackCompiler } from "./main";

program
.version(pkg.version);

const env = program.createOption('--env [value]', '环境变量')
const apps = program.createOption('--apps [value]', '要构建的模块')
const uniqueName = program.createOption('--uniqueName [value]', '在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称')
const optionAction = (options) => {
    parameter.init(options)
    process.env.NODE_ENV = options.env
}

program
.command('dev')
.addOption(env)
.addOption(apps)
.addOption(uniqueName)
.action((options) => {
    optionAction(options)
    runDev()
})

program
.command('build')
.addOption(env)
.addOption(apps)
.addOption(uniqueName)
.action((options) => {
    optionAction(options)
    runBuild()
})

program.parse()
