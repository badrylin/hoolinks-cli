/**
 * 根据入口模块和包版本号生产hash
 * @param entry 入口列表
 */
export declare const createDllHash: (entry: string[]) => string;
/**
 * 检测dll模块是否存在
 * @param entry 入口名称
 */
export declare const checkDllForHash: (entryName: string, hash: any) => boolean;
