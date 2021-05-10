import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { apps, DIST_PATH, ROOT_PATH } from "../utils/global";

export const htmlPlugin: HtmlWebpackPlugin[] = apps.map(app => {
    return new HtmlWebpackPlugin({
        filename: path.join(DIST_PATH, `${app}/index.html`),
        template: path.join(ROOT_PATH, `./src/${app}/index.html`),
        inject: true,
        chunks: ['common', app],
        chunksSortMode: "auto",

    })
})
