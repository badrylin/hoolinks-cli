"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlPlugin = void 0;
var path_1 = __importDefault(require("path"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var global_1 = require("../utils/global");
exports.htmlPlugin = global_1.apps.map(function (app) {
    return new html_webpack_plugin_1.default({
        filename: path_1.default.join(global_1.DIST_PATH, app + "/index.html"),
        template: path_1.default.join(global_1.ROOT_PATH, "./src/" + app + "/index.html"),
        inject: true,
        chunks: ['common', app],
        chunksSortMode: "auto",
    });
});
