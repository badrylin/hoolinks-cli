import path from 'path';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { RuleSetRule } from 'webpack';
import { eConfig } from '../utils/config';
import { SRC_PATH } from '../utils/global';

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
                        // happyPackMode: true,
                        transpileOnly: true,
                        ...eConfig.tsOptions,
                        // getCustomTransformers: () => ({
                        //     before: [ReactRefreshTypeScript()],
                        // }),
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
