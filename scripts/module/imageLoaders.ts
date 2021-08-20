import { RuleSetRule } from 'webpack';
import { SRC_PATH, STATIC_PATH } from '../utils/global';

export const imageLoaders = (): RuleSetRule[] => {
    return [
        {
            test: /\.(png|jpe?g|gif)$/,
            type: 'asset/resource',
            generator: {
                filename: 'common/images/[name].[hash:6][ext][query]'
            },
            exclude: [STATIC_PATH],
        }
    ]
}
