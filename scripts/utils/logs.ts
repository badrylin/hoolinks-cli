/*
 * @Author: linzeqin
 * @Date: 2021-06-09 16:39:41
 * @description: 控制台日志管理
 */
import chalk from 'chalk';
import { pkg } from './global';

/** 控制台日志打印 */
export const llog = (message: any, color: typeof chalk.Color = 'green') => {
    console.log(chalk.blue(`[${pkg.name}]:${chalk[color](message)}`));
}
