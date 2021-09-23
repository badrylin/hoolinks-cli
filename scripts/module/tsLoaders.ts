import { merge } from 'lodash';
import { RuleSetRule } from 'webpack';
import { eConfig } from '../utils/config';
import { NODE_MODULES_PATH, SRC_PATH } from '../utils/global';
import { babelLoaders } from './babelLoader';

export const tsLoaders = (): RuleSetRule[] => {
    return [
        {
            test: /\.(ts|tsx)$/,
            use: [
                // 'thread-loader',
                babelLoaders,
                'cache-loader',
                {
                    loader: 'ts-loader',
                    options: {
                        allowTsInNodeModules: true,
                        happyPackMode: true,
                        transpileOnly: true,
                        ...eConfig.tsOptions,
                    }
                }
            ],
            include: [
                SRC_PATH,
                ...eConfig.tsInclude,
            ]
        }
    ]
}
