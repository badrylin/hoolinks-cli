import { ModuleOptions } from "webpack";
import { cssLoaders } from "./cssLoaders";
import { fontLoaders } from "./fontLoaders";
import { imageLoaders } from "./imageLoaders";
import { jsLoaders } from "./jsLoaders";
import { tsLoaders } from "./tsLoaders";

export const module: ModuleOptions = {
    rules: [
        {
            oneOf: [
                ...jsLoaders(),
                ...tsLoaders(),
            ]
        },
        ...cssLoaders(),
        ...fontLoaders(),
        ...imageLoaders(),
    ]
}
