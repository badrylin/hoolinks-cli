import { RuleSetRule, RuleSetUseItem } from "webpack";
import { merge } from 'webpack-merge';
import { eConfig } from "../utils/config";

export const babelLoaders: RuleSetUseItem = {
    loader: 'babel-loader',
    options: {
        ...merge(
            {
                presets: ["@babel/preset-env", "@babel/preset-react"]
            },
            eConfig.babelOptions,
        )
    }
}
