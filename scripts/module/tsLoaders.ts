import path from 'path';
import { RuleSetRule } from 'webpack';
import { NODE_MODULES_PATH, ROOT_PATH } from '../utils/global';

export const tsLoaders = (): RuleSetRule[] => {
    return [
        {
            test: /\.(ts|tsx)$/,
            include: [path.join(ROOT_PATH, './src')],
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            ["import", { "libraryName": "antd", style: true}, "antd"],
                        ]
                    },
                },
                'ts-loader'
            ],
            exclude: [ NODE_MODULES_PATH ]
        }
    ]
}
