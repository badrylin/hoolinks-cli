"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsLoaders = void 0;
var config_1 = require("../utils/config");
var global_1 = require("../utils/global");
var babelLoader_1 = require("./babelLoader");
var jsLoaders = function () {
    return [
        {
            test: /\.(js|jsx)$/,
            use: [
                // 'thread-loader',
                babelLoader_1.babelLoaders
            ],
            include: __spreadArray([
                global_1.SRC_PATH
            ], config_1.eConfig.babelInclude),
        }
    ];
};
exports.jsLoaders = jsLoaders;
