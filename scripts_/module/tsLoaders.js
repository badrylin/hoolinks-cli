"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsLoaders = void 0;
var path_1 = __importDefault(require("path"));
var global_1 = require("../utils/global");
var tsLoaders = function () {
    return [
        {
            test: /\.(ts|tsx)$/,
            include: [path_1.default.join(global_1.ROOT_PATH, './src')],
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            ["import", { "libraryName": "antd", style: true }, "antd"],
                        ]
                    },
                },
                'ts-loader'
            ],
            exclude: [global_1.NODE_MODULES_PATH]
        }
    ];
};
exports.tsLoaders = tsLoaders;
