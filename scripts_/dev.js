"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.devServerConfig = void 0;
const Server_1 = __importDefault(require("webpack-dev-server/lib/Server"));
const config_1 = require("./utils/config");
const global_1 = require("./utils/global");
const params_1 = require("./utils/params");
const webpack_1 = require("./webpack");
/** devServer默认配置 */
exports.devServerConfig = Object.assign({ port: 9000, open: params_1.Params.apps[0], client: {
        // logging: 'warn',
        overlay: false,
        progress: true,
    }, static: {
        directory: global_1.STATIC_PATH,
        watch: true,
        publicPath: '/static',
    }, devMiddleware: {
        stats: {
            all: false,
            errors: true,
            warnings: true
        },
    } }, config_1.eConfig.devServer);
const run = () => {
    const devServer = new Server_1.default(exports.devServerConfig, webpack_1.CliMain.compiler);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield devServer.start();
        // Ctrl + C is super duper slow because it has to close a bunch of fs.watch handles. Let's just skip
        // all that.
        // https://github.com/webpack/webpack-dev-server/issues/1479
        process.on('SIGINT', () => {
            process.exit();
        });
    }))();
};
exports.run = run;
