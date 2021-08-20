import path from 'path';
import { RuleSetRule } from 'webpack';
import { ROOT_PATH, STATIC_PATH } from '../utils/global';

export const fontLoaders = (): RuleSetRule[] => {
    return [{
        test: /\.(woff|woff2|svg|eot|ttf)$/i,
        type: 'asset/inline',
        exclude: [STATIC_PATH],
    }]
}
