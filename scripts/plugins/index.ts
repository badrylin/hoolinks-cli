import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration } from "webpack";
import WebpackBar from "webpackbar";
import { htmlPlugin } from "./htmlPlugin";

export const plugins: Configuration['plugins'] = [
    ...htmlPlugin,
    new CleanWebpackPlugin({}),
    new WebpackBar({}),
]
