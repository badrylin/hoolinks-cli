/*
 * @Author: linzeqin
 * @Date: 2021-06-09 16:39:41
 * @description: 控制台日志管理
 */
import chalk from 'chalk';
import { pkg } from './global';
import boxen from 'boxen';
import os from 'os';

/** 控制台日志打印 */
export const llog = (message: any, color: typeof chalk.Color = 'green') => {
    console.log(chalk.blue(`[${pkg.name}]:${chalk[color](message)}`));
}


function getAvailableIPs() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
            const address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}

export const devBoxLog = (params: {
    time: number,
    port: number,
    path: string,
}) => {
const defaultTemplate = `
App running at:
- Time: ${chalk.yellow(`${params.time}s`)}
- Local: ${chalk.cyan(`http://localhost:${params.port}/${params.path}`)}
- Network: ${chalk.cyan(`http://${getAvailableIPs()[0] || '0.0.0.0'}:${params.port}/${params.path}`)}
`;
    const message = boxen(defaultTemplate, {
        padding: { left: 2, right: 2, top: 0, bottom: 0},
        align: 'left',
        borderColor: 'blue',
    });
    console.log(message);
}
