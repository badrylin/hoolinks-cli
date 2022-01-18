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
                ...jsLoaders_1.jsLoaders(),
                ...tsLoaders_1.tsLoaders(),
            ]
        },
        ...cssLoaders_1.cssLoaders(),
        ...fontLoaders_1.fontLoaders(),
        ...imageLoaders_1.imageLoaders(),
    ]
};
