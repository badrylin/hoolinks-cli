import chalk from 'chalk';
import { pkg } from './global';

/** 控制台日志打印 */
export const llog = (message: any, color: typeof chalk.Color = 'green') => {
    console.log(chalk.blue(`[${pkg.name}]:${chalk[color](message)}`));
}
