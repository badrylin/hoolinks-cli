"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsLoaders = void 0;
const config_1 = require("../utils/config");
const global_1 = require("../utils/global");
const babelLoader_1 = require("./babelLoader");
const jsLoaders = () => {
    return [
        {
            test: /\.(js|jsx)$/,
            use: [
                // 'thread-loader',
                babelLoader_1.babelLoaders
            ],
            include: [
                global_1.SRC_PATH,
                ...config_1.eConfig.babelInclude,
            ],
        }
    ];
};
exports.jsLoaders = jsLoaders;
