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
Object.defineProperty(exports, "__esModule", { value: true });
exports.babelLoaders = void 0;
var webpack_merge_1 = require("webpack-merge");
var config_1 = require("../utils/config");
exports.babelLoaders = {
    loader: 'babel-loader',
    options: __assign({}, webpack_merge_1.merge({
        presets: ["@babel/preset-env", "@babel/preset-react"]
    }, config_1.eConfig.babelOptions))
};