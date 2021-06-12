import { RuleSetRule } from 'webpack';

export const imageLoaders = (): RuleSetRule[] => {
    return [
        {
            test: /\.(png|jpe?g|gif)$/,
            type: 'asset/resource',
            generator: {
                filename: 'common/images/[name].[hash:6][ext][query]'
            },
        }
    ]
}
