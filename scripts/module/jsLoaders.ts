import { RuleSetRule } from 'webpack';
import { SRC_PATH } from '../utils/global';
import { babelLoaders } from './babelLoader';

export const jsLoaders = (): RuleSetRule[] => {
    return [
        {
            test: /\.(js|jsx)$/,
            use: [
                // 'thread-loader',
                babelLoaders
            ],
            include: [ SRC_PATH ],
        }
    ]
}
