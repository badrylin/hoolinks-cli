"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontLoaders = void 0;
var global_1 = require("../utils/global");
var fontLoaders = function () {
    return [{
            test: /\.(woff|woff2|svg|eot|ttf)$/i,
            type: 'asset/inline',
            exclude: [global_1.STATIC_PATH],
        }];
};
exports.fontLoaders = fontLoaders;
