"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.babelLoaders = void 0;
const webpack_merge_1 = require("webpack-merge");
const global_1 = require("../utils/global");
exports.babelLoaders = {
    loader: 'babel-loader',
    options: Object.assign({}, webpack_merge_1.merge({
        presets: ["@babel/preset-env"],
        cacheDirectory: global_1.BABEL_CACHE_PATH,
        // presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
        // plugins: [
        //     ["@babel/plugin-proposal-decorators", { "legacy": true }],
        //     ["@babel/plugin-proposal-class-properties", { "loose" : true }]
        // ],
    }))
};
//# sourceMappingURL=babelLoader.js.map