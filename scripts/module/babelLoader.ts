import { RuleSetRule, RuleSetUseItem } from "webpack";
import { merge } from 'webpack-merge';
import { eConfig } from "../utils/config";
import { BABEL_CACHE_PATH } from "../utils/global";

export const babelLoaders: RuleSetUseItem = {
    loader: 'babel-loader',
    options: {
        ...merge(
            {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                cacheDirectory: BABEL_CACHE_PATH,
                // presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                // plugins: [
                //     ["@babel/plugin-proposal-decorators", { "legacy": true }],
                //     ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                // ],
            },
            eConfig.babelOptions,
        )
    }
}
