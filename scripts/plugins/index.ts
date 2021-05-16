import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import WebpackBar from "webpackbar";
import { Params } from "../utils/params";
import { htmlPlugin } from "./htmlPlugin";

export const plugins: Configuration['plugins'] = [
    ...htmlPlugin,
    new CleanWebpackPlugin({}),
    new WebpackBar({}),
    new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(Params.env),
        'process.env.environment': JSON.stringify(Params.env),
        'process.env.apps': JSON.stringify(Params.apps),
        'process.env.uniqueName': JSON.stringify(Params.uniqueName),
    })
]
