"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontLoaders = void 0;
const global_1 = require("../utils/global");
const fontLoaders = () => {
    return [{
            test: /\.(woff|woff2|svg|eot|ttf)$/i,
            type: 'asset/inline',
            exclude: [global_1.STATIC_PATH],
        }];
};
exports.fontLoaders = fontLoaders;
//# sourceMappingURL=fontLoaders.js.map