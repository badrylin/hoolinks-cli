import chalk from 'chalk';
/** 控制台日志打印 */
export declare const llog: (message: any, color?: typeof chalk.Color) => void;
export declare const devBoxLog: (params: {
    time: number | string;
    port: number | string;
    path: string;
}) => void;
