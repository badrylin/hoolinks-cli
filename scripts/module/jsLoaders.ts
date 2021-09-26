import { RuleSetRule } from 'webpack';
import { eConfig } from '../utils/config';
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
            include: [
                SRC_PATH,
                ...eConfig.babelInclude,
            ],
        }
    ]
}
