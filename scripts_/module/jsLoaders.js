"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsLoaders = void 0;
var global_1 = require("../utils/global");
var babelLoader_1 = require("./babelLoader");
var jsLoaders = function () {
    return [
        {
            test: /\.(js|jsx)$/,
            use: [
                'thread-loader',
                babelLoader_1.babelLoaders
            ],
            include: [global_1.SRC_PATH],
        }
    ];
};
exports.jsLoaders = jsLoaders;
