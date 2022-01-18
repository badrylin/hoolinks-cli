"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsLoaders = void 0;
const path_1 = __importDefault(require("path"));
const react_refresh_typescript_1 = __importDefault(require("react-refresh-typescript"));
const config_1 = require("../utils/config");
const global_1 = require("../utils/global");
const tsLoaders = () => {
    return [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            use: [
                'cache-loader',
                path_1.default.join(__dirname, './importLoader'),
                {
                    loader: 'ts-loader',
                    options: Object.assign(Object.assign({ allowTsInNodeModules: true, 
                        // happyPackMode: true,
                        transpileOnly: true }, config_1.eConfig.tsOptions), { getCustomTransformers: () => ({
                            before: [react_refresh_typescript_1.default()],
                        }) })
                },
            ],
            include: [
                global_1.SRC_PATH,
                ...config_1.eConfig.tsInclude,
            ]
        }
    ];
};
exports.tsLoaders = tsLoaders;
//# sourceMappingURL=tsLoaders.js.map