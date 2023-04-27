import { RuleSetRule } from 'webpack';
import { eConfig } from '../utils/config';
import { SRC_PATH } from '../utils/global';

export const tsLoaders = (): RuleSetRule[] => {
    return [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            use: [
                {
                    loader: 'esbuild-loader',
                    options: {
                        jsx: 'automatic',
                    },
                }
            ],
            include: [
                SRC_PATH,
                ...eConfig.tsInclude,
            ]
        }
    ]
}
