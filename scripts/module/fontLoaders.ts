import path from 'path';
import { RuleSetRule } from 'webpack';
import { ROOT_PATH } from '../utils/global';

export const fontLoaders = (): RuleSetRule[] => {
    return [{
        test: /\.(woff|woff2|svg|eot|ttf)$/i,
        type: 'asset/inline',
    }]
}
