"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
            oneOf: __spreadArray(__spreadArray([], (0, jsLoaders_1.jsLoaders)(), true), (0, tsLoaders_1.tsLoaders)(), true)
        }
    ], (0, cssLoaders_1.cssLoaders)(), true), (0, fontLoaders_1.fontLoaders)(), true), (0, imageLoaders_1.imageLoaders)(), true)
};
