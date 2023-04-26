"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsLoaders = void 0;
const config_1 = require("../utils/config");
const global_1 = require("../utils/global");
const tsLoaders = () => {
    return [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            // use: [
            //     'cache-loader',
            //     path.join(__dirname, './importLoader'),
            //     {
            //         loader: 'ts-loader',
            //         options: {
            //             allowTsInNodeModules: true,
            //             // happyPackMode: true,
            //             transpileOnly: true,
            //             ...eConfig.tsOptions,
            //             // getCustomTransformers: () => ({
            //             //     before: [ReactRefreshTypeScript()],
            //             // }),
            //         }
            //     },
            // ],
            use: [
                'cache-loader',
                {
                    loader: 'esbuild-loader',
                    options: {
                        target: 'es5',
                        jsx: 'automatic',
                    },
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
//# sourceMappingURL=tsLoaders.js.map