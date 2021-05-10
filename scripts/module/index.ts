import { ModuleOptions } from "webpack";
import { cssLoaders } from "./cssLoaders";
import { fileLoaders } from "./fileLoaders";
import { fontLoaders } from "./fontLoaders";
import { imageLoaders } from "./imageLoaders";
import { jsLoaders } from "./jsLoaders";
import { jsonLoaders } from "./jsonLoaders";
import { tsLoaders } from "./tsLoaders";

export const module = {
    rules: [
        ...cssLoaders(),
        ...fileLoaders(),
        ...fontLoaders(),
        ...imageLoaders(),
        ...jsLoaders(),
        ...jsonLoaders(),
        ...tsLoaders(),
    ]
}
