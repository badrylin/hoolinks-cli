/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:30
 * @description: 入口
 */
import { program } from 'commander';
import { pkg } from "./utils/global";
import { Params } from "./utils/params";

program
.version(pkg.version);

const env = program.createOption('--env [value]', '环境变量')
const apps = program.createOption('--apps [value]', '要构建的模块')
const uniqueName = program.createOption('--uniqueName [value]', '在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称')
const cdn = program.createOption('--cdn [value]', 'js css img等模块cdn域名配置')
const report = program.createOption('-s, --report', '启动打包分析')
const speed = program.createOption('-p, --speed', '启动打包速度分析')

/** 初始化用户参数，通用 */
const initOption = (options, isDev) => {
    Params.init(options, isDev)
}

/** 初始化webpack配置, 只适用dev和build，不适用dll */
const initWepack = () => {
    const { CliMain } = require("./webpack")
    CliMain.init();
}

program
.command('dev')
.addOption(env)
.addOption(apps)
.addOption(uniqueName)
.addOption(cdn)
.addOption(report)
.addOption(speed)
.action((options) => {
    initOption(options, true);
    initWepack();
    require("./dev").default()
})

program
.command('build')
.addOption(env)
.addOption(apps)
.addOption(uniqueName)
.addOption(cdn)
.addOption(report)
.addOption(speed)
.action((options) => {
    initOption(options, false)
    initWepack();
    require("./build").default()
})

program
.command('dll')
.addOption(uniqueName)
.addOption(report)
.addOption(speed)
.action((options) => {
    initOption(options, false)
    require("./dll").default()
})

program.parse()
