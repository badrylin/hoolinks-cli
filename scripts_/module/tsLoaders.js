"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsLoaders = void 0;
const config_1 = require("../utils/config");
const global_1 = require("../utils/global");
const babelLoader_1 = require("./babelLoader");
const tsLoaders = () => {
    return [
        {
            test: /\.(ts|tsx)$/,
            use: [
                // 'thread-loader',
                babelLoader_1.babelLoaders,
                'cache-loader',
                {
                    loader: 'ts-loader',
                    options: Object.assign({ allowTsInNodeModules: true, happyPackMode: true, transpileOnly: true }, config_1.eConfig.tsOptions)
                }
            ],
            include: [
                global_1.SRC_PATH,
                ...config_1.eConfig.tsInclude,
            ]
        }
    ];
};
exports.tsLoaders = tsLoaders;
