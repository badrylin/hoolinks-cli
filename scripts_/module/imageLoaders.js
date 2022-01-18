"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageLoaders = void 0;
const global_1 = require("../utils/global");
const imageLoaders = () => {
    return [
        {
            test: /\.(png|jpe?g|gif)$/,
            type: 'asset/resource',
            generator: {
                filename: 'common/images/[name].[hash:6][ext][query]'
            },
            exclude: [global_1.STATIC_PATH],
        }
    ];
};
exports.imageLoaders = imageLoaders;
//# sourceMappingURL=imageLoaders.js.map