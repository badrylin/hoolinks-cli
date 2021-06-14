"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.module = void 0;
var cssLoaders_1 = require("./cssLoaders");
var fontLoaders_1 = require("./fontLoaders");
var imageLoaders_1 = require("./imageLoaders");
var jsLoaders_1 = require("./jsLoaders");
var tsLoaders_1 = require("./tsLoaders");
exports.module = {
    rules: __spreadArray(__spreadArray(__spreadArray([
        {
            oneOf: __spreadArray(__spreadArray([], jsLoaders_1.jsLoaders()), tsLoaders_1.tsLoaders())
        }
    ], cssLoaders_1.cssLoaders()), fontLoaders_1.fontLoaders()), imageLoaders_1.imageLoaders())
};
