"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageLoaders = void 0;
var imageLoaders = function () {
    return [
        {
            test: /\.(png|jpe?g|gif)$/,
            type: 'asset/resource',
            generator: {
                filename: 'common/images/[name].[hash:6][ext][query]'
            },
        }
    ];
};
exports.imageLoaders = imageLoaders;
