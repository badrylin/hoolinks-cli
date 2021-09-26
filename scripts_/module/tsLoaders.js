"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsLoaders = void 0;
var config_1 = require("../utils/config");
var global_1 = require("../utils/global");
var babelLoader_1 = require("./babelLoader");
var tsLoaders = function () {
    return [
        {
            test: /\.(ts|tsx)$/,
            use: [
                // 'thread-loader',
                babelLoader_1.babelLoaders,
                'cache-loader',
                {
                    loader: 'ts-loader',
                    options: __assign({ allowTsInNodeModules: true, happyPackMode: true, transpileOnly: true }, config_1.eConfig.tsOptions)
                }
            ],
            include: __spreadArray([
                global_1.SRC_PATH
            ], config_1.eConfig.tsInclude)
        }
    ];
};
exports.tsLoaders = tsLoaders;
