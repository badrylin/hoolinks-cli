import { Compiler, Configuration } from "webpack";
export declare class CliMain {
    /** webpack主配置 */
    static config: Configuration;
    /** webpack实例 */
    static compiler: Compiler;
    /** 初始化webpack实例 */
    static init: () => void;
}
