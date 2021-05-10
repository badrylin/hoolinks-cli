import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import WebpackBar from "webpackbar";
import { webpackCompiler } from "../main";
import { parameter } from "../utils/parameter";
import { htmlPlugin } from "./htmlPlugin";

export const plugins: Configuration['plugins'] = [
    ...htmlPlugin,
    new CleanWebpackPlugin({}),
    new WebpackBar({}),
    new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev'),
    })
]
