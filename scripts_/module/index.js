"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.module = void 0;
const cssLoaders_1 = require("./cssLoaders");
const fontLoaders_1 = require("./fontLoaders");
const imageLoaders_1 = require("./imageLoaders");
const jsLoaders_1 = require("./jsLoaders");
const tsLoaders_1 = require("./tsLoaders");
exports.module = {
    rules: [
        {
            oneOf: [
                ...(0, jsLoaders_1.jsLoaders)(),
                ...(0, tsLoaders_1.tsLoaders)(),
            ]
        },
        ...(0, cssLoaders_1.cssLoaders)(),
        ...(0, fontLoaders_1.fontLoaders)(),
        ...(0, imageLoaders_1.imageLoaders)(),
    ]
};
