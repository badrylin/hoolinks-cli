/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:30
 * @description: 入口
 */
import { program } from 'commander';
import { pkg, setIsDev } from "./utils/global";
import { Params } from "./utils/params";

program
.version(pkg.version);

const env = program.createOption('--env [value]', '环境变量')
const apps = program.createOption('--apps [value]', '要构建的模块')
const uniqueName = program.createOption('--uniqueName [value]', '在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称')
const optionAction = (options) => {
    /** 存储用户参数 */
    Params.init(options)
    /** 初始化webpack配置 */
    const { CliMain } = require("./webpack")
    CliMain.init();
}

program
.command('dev')
.addOption(env)
.addOption(apps)
.addOption(uniqueName)
.action((options) => {
    setIsDev(true);
    optionAction(options)
    require("./dev").default()
})

program
.command('build')
.addOption(env)
.addOption(apps)
.addOption(uniqueName)
.action((options) => {
    setIsDev(false);
    optionAction(options)
    require("./build").default()
})

program.parse()
