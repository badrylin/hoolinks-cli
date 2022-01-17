import { merge } from 'lodash';
import path from 'path';
import { RuleSetRule } from 'webpack';
import { eConfig } from '../utils/config';
import { NODE_MODULES_PATH, SRC_PATH } from '../utils/global';
import { babelLoaders } from './babelLoader';

export const tsLoaders = (): RuleSetRule[] => {
    return [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            use: [
                'cache-loader',
                path.join(__dirname, './importLoader'),
                {
                    loader: 'ts-loader',
                    options: {
                        allowTsInNodeModules: true,
                        happyPackMode: true,
                        transpileOnly: true,
                        ...eConfig.tsOptions,
                    }
                },
            ],
            include: [
                SRC_PATH,
                ...eConfig.tsInclude,
            ]
        }
    ]
}
