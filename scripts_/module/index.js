"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.module = void 0;
var cssLoaders_1 = require("./cssLoaders");
var fileLoaders_1 = require("./fileLoaders");
var fontLoaders_1 = require("./fontLoaders");
var imageLoaders_1 = require("./imageLoaders");
var jsLoaders_1 = require("./jsLoaders");
var jsonLoaders_1 = require("./jsonLoaders");
var tsLoaders_1 = require("./tsLoaders");
exports.module = {
    rules: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], cssLoaders_1.cssLoaders()), fileLoaders_1.fileLoaders()), fontLoaders_1.fontLoaders()), imageLoaders_1.imageLoaders()), jsLoaders_1.jsLoaders()), jsonLoaders_1.jsonLoaders()), tsLoaders_1.tsLoaders())
};
