"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontLoaders = void 0;
var fontLoaders = function () {
    return [{
            test: /\.(woff|woff2|svg|eot|ttf)$/i,
            type: 'asset/inline',
        }];
};
exports.fontLoaders = fontLoaders;
